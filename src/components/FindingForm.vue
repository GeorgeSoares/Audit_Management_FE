<template>
  <div class="form-container">
    <h3>{{ isEdit ? 'Edit Finding' : 'New Finding' }}</h3>

    <label for="assessment">Assessment:</label>
    <input id="assessment" type="text" v-model="form.assessment" />

    <label for="title">Title:</label>
    <input id="title" type="text" v-model="form.findingTitle" />

    <label for="description">Description:</label>
    <textarea id="description" v-model="form.findingDescription"></textarea>

    <label for="responsible">Responsible Person:</label>
    <input id="responsible" type="text" v-model="form.responsiblePerson" />

    <label for="status">Status:</label>
    <select id="status" v-model="form.status">
      <option>Open</option>
      <option>In Progress</option>
      <option>Closed</option>
    </select>

    <div class="actions">
      <button class="button" @click="submit">
        {{ isEdit ? 'Update Finding' : 'Save Finding' }}
      </button>
      <button class="button cancel" @click="$emit('cancel')">Cancel</button>
    </div>
  </div>
</template>

<script>
import { reactive, watchEffect } from 'vue'

export default {
  name: 'FindingForm',
  props: {
    initial: { type: Object, default: null }
  },
  setup(props, { emit }) {
    const form = reactive({
      assessment: '',
      findingTitle: '',
      findingDescription: '',
      responsiblePerson: '',
      status: 'Open'
    })

    watchEffect(() => {
      if (props.initial && props.initial.findingNumber) {
        form.assessment = props.initial.assessment
        form.findingTitle = props.initial.findingTitle
        form.findingDescription = props.initial.findingDescription
        form.responsiblePerson = props.initial.responsiblePerson
        form.status = props.initial.status || 'Open'
      }
    })

    const submit = () => {
      emit('save', { ...form, id: props.initial?.findingNumber })
    }

    return { form, submit, isEdit: props.initial?.findingNumber !== undefined }
  }
}
</script>

<style scoped>
.form-container {
  background: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 600px;
  margin: 20px auto;
}
.form-container label {
  display: block;
  margin: 12px 0 4px;
}
.form-container input,
.form-container textarea,
.form-container select {
  width: 100%;
  padding: 6px;
  margin-bottom: 10px;
}
.actions {
  margin-top: 20px;
}
.button {
  padding: 8px 12px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
.cancel {
  background-color: #6c757d;
}
</style>