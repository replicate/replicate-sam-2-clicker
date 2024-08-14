<template>
  <div class="mx-auto p-8 max-w-3xl">
    <h1 class="text-5xl text-center mb-8">Replicate SAM-2 Clicker</h1>
    <h1 class="text-lg text-center mb-8">
      <a
        href="https://replicate.com/meta/sam-2-video"
        target="_new"
        class="text-blue-500 hover:underline mr-8"
      >
        Run SAM-2 with an API
      </a>
      <a
        href="https://github.com/replicate/replicate-sam-2-clicker"
        target="_new"
        class="hover:underline"
        >View the &lt;code&gt;</a
      >
    </h1>

    <!-- Video Container -->
    <div class="text-center">
      <!-- Show 'select file' input if no video file has been chosen -->
      <input
        v-if="!video_file"
        @change="onFileSelected"
        type="file"
        accept="video/*"
      />

      <!-- Else: if a video file has been chosen, show the video -->
      <video v-if="video_file" controls>
        <source :src="video_file" />
      </video>
    </div>

    <!-- SAM-2 model input clicks container, only show if a video file has been selected -->
    <div v-if="video_file">
      <!-- Show input parameters if we're not loading a prediction -->
      <div v-if="!loading">
        <!-- List all clicks -->
        <div v-for="(click, i) in clicks" :key="i" class="mt-4 p-4 border-2">
          <b class="block">#{{ i + 1 }} Click</b>

          <!-- Click pixel coordinates -->
          <div class="grid grid-cols-2 mt-2">
            <label for="coordinates">Pixel coordinates for click [x,y] </label>
            <input
              v-model="clicks[i].coordinates"
              type="text"
              name="coordinates"
              required
              class="border-2"
            />
          </div>

          <!-- Click label -->
          <div class="grid grid-cols-2 mt-2">
            <label for="label">Label for click </label>
            <input
              v-model="clicks[i].label"
              type="number"
              name="label"
              required
              class="border-2"
            />
          </div>

          <!-- Click object ID -->
          <div class="grid grid-cols-2 mt-2">
            <label for="object_id">Object ID for click </label>
            <input
              v-model="clicks[i].object_id"
              type="text"
              name="object_id"
              required
              class="border-2"
            />
          </div>
        </div>

        <!-- Add more clicks button -->
        <button
          @click="addClick"
          class="mt-4 p-4 block w-full bg-amber-200 hover:bg-amber-300"
        >
          + Add click
        </button>

        <!-- Submit button -->
        <button
          @click="submit"
          class="mt-4 p-4 block w-full text-white bg-neutral-600 hover:bg-neutral-800"
        >
          Submit
        </button>

        <!-- Input parameter explanation -->
        <div class="mt-4 p-4 bg-blue-50">
          <h3 class="text-2xl font-bold mb-4">Explanation</h3>
          <div class="grid grid-cols-2">
            <div><b>Pixel coordinates for click</b></div>
            <div>
              A string in the form [x,y] for where the click should be in the
              first frame.
            </div>
          </div>
          <div class="grid grid-cols-2 mt-4">
            <div><b>Label for click</b></div>
            <div>
              A 1 or a 0 for adding or subtracting a segment from tracking.
            </div>
          </div>
          <div class="grid grid-cols-2 mt-4">
            <div><b>Object ID for click</b></div>
            <div>A string used to group objects together for labelling.</div>
          </div>
        </div>
      </div>

      <!-- Show progress if we're loading a prediction -->
      <div v-else>
        <!-- Prediction logs -->
        <pre class="mt-4 p-4 bg-gray-200 whitespace-pre-wrap">{{ logs }}</pre>

        <!-- Prediction output video -->
        <video v-if="output" controls class="mt-4">
          <source :src="output" />
        </video>
      </div>
    </div>
  </div>
</template>

<script>
// Utility function to convert a file URL into a base64 encoded data URI
const urlToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      .catch(reject)
  })
}

// utility function to wait for a set of milliseconds
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export default {
  name: 'app',
  data() {
    return {
      // Contains the input video file
      video_file: null,

      // Contians input clicks
      clicks: [
        {
          coordinates: '[800,200]',
          label: 1,
          object_id: 'object_1'
        }
      ],

      // Indicated whether a prediction is loading
      loading: false,

      // Logs for prediction
      logs: '',

      // Outout for prediction
      output: null
    }
  },
  methods: {
    // Once a file has been selected, create an object URL that can be used by a <video> element
    onFileSelected(e) {
      this.video_file = URL.createObjectURL(e.target.files[0])
    },

    // Add another click to the click list
    addClick() {
      this.clicks.push({
        coordinates: '[800,200]',
        label: 1,
        object_id: 'object_1'
      })
    },

    // Submit a Replicate prediction
    async submit() {
      try {
        this.loading = true

        // Format input parameters
        // For all parameters, check: https://replicate.com/zsxkib/sam-2-video
        const input = {
          input_video: await urlToBase64(this.video_file),
          click_coordinates: this.clicks
            .map((click) => click.coordinates)
            .join(','),
          click_labels: this.clicks.map((click) => click.label).join(','),
          click_object_ids: this.clicks
            .map((click) => click.object_id)
            .join(','),
          mask_type: 'highlighted',
          output_video: true
        }

        // Create prediction
        const { data } = await $fetch('/api/prediction', {
          method: 'POST',
          body: {
            input
          }
        })
        console.log('data', data)

        // Poll
        this.logs = 'starting...'
        let status = 'starting'
        let response = null

        while (status !== 'succeeded' && status !== 'failed') {
          response = await $fetch(`/api/prediction?id=${data?.id}`)

          this.logs =
            response.data.logs === '' ? 'starting...' : response.data.logs
          status = response.data.status

          if (status !== 'succeeded' && status !== 'failed') {
            await sleep(5000) // Wait 5s before polling again
          }
        }

        this.output = response.data.output
      } catch (e) {
        alert('Something went wrong, check console for error.')
        console.error(e)
      }
    }
  }
}
</script>

<style lang="stylus" scoped></style>
