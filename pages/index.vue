<template>
  <b-container>
    <b-navbar toggleable="lg" type="dark" variant="primary" class="mb-3">
      <b-navbar-brand href="#">PassGen</b-navbar-brand>
    </b-navbar>

    <b-form class="p-3 rounded bg-light">
      <b-form-group
        class="m-1 p-1"
        id="salt-group"
        label="Input Your Salt"
        label-for="salt-input"
      >
        <b-form-input
          id="salt-input"
          v-model="salt"
          type="password"
          required
          placeholder="xxxxxxxx"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        class="m-1 p-1"
        id="service-group"
        label="Select Service"
        label-for="service-select"
      >
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </b-form-group>

      <b-form-group
        class="m-1 p-1"
        id="result-group"
        label="Result"
        label-for="result-input"
      >
        <b-form-input
          id="result-input"
          v-model="result"
          type="text"
          :disabled="true"
        ></b-form-input>
      </b-form-group>

      <b-form-group class="m-1 p-1" id="ctc-group">
        <b-overlay
          :show="isVisibleCopied"
          class="w-100 d-inline-block"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
        >
          <template v-slot:overlay>
            <div class="d-flex" align-items-center>
              <span>Copied!</span>
            </div>
          </template>
          <b-button
            id="copyToClipboard-button"
            class="w-100"
            v-on:click="copyToClipboard"
            type="button"
            variant="primary"
            >Copy To Clipboard</b-button
          >
        </b-overlay>
      </b-form-group>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      salt: null,
      selected: [],
      result: '',
      isVisibleCopied: false
    }
  },
  asyncData(context) {
    return context.$axios.$get('~static/services.json').then((res) => {
      return {
        options: res
      }
    })
  },
  watch: {
    salt(newSalt, oldSalt) {
      let tmp = newSalt
      for (let i = 0; i < this.selected.length; i++) {
        const command = this.selected[i].command
        const args = this.selected[i].args
        if (command === 'md5') {
          tmp = this.md5(tmp)
        } else if (command === 'cut') {
          tmp = this.cut(tmp, args[0], args[1])
        } else if (command === 'append') {
          tmp = this.append(tmp, args[0])
        }
      }
      this.result = tmp
    }
  },
  methods: {
    md5(value) {
      return this.CryptoJS.MD5(value).toString()
    },
    cut(value, from, to) {
      return value.substring(from, to)
    },
    append(value, suffix) {
      return value + suffix
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.result).then(() => {
        this.isVisibleCopied = true
        setTimeout(() => {
          this.isVisibleCopied = false
        }, 500)
      })
    }
  }
}
</script>
