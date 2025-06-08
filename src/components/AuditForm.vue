<template>
  <div class="form-container">
    <h3>{{ isEdit ? 'Edit Audit' : 'New Audit' }}</h3>

    <label for="begin">Start Date:</label>
    <input id="begin" type="date" v-model="form.auditBeginStr" />

    <label for="end">End Date:</label>
    <input id="end" type="date" v-model="form.auditEndStr" />

    <label for="lead">Lead Auditor:</label>
    <input id="lead" type="text" v-model="form.leadAuditor" />

    <label for="co">Co-Auditors (comma-separated):</label>
    <input id="co" type="text" v-model="form.coAuditors" />

    <label for="company">Company:</label>
    <input id="company" type="text" v-model="form.auditedCompany" />

    <label for="department">Department:</label>
    <input id="department" type="text" v-model="form.auditedDepartment" />

    <div class="actions">
      <button class="button" @click="onSubmit">
        {{ isEdit ? 'Update' : 'Save' }}
      </button>
      <button class="button cancel" @click="$emit('cancel')">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuditForm',
  props: {
    initial: Object // usado para edição
  },
  data() {
    return {
      form: {
        auditBeginStr: '',
        auditEndStr: '',
        leadAuditor: '',
        coAuditors: '',
        auditedCompany: '',
        auditedDepartment: ''
      }
    }
  },
  computed: {
    isEdit() {
      return this.initial && this.initial.auditId
    }
  },
  mounted() {
    if (this.isEdit) {
      const { auditBegin, auditEnd, leadAuditor, coAuditors, auditedCompany, auditedDepartment } = this.initial
      this.form = {
        auditBeginStr: new Date(auditBegin).toISOString().substr(0, 10),
        auditEndStr: new Date(auditEnd).toISOString().substr(0, 10),
        leadAuditor,
        coAuditors,
        auditedCompany,
        auditedDepartment
      }
    }
  },
  methods: {
    onSubmit() {
      const payload = {
        auditBegin: new Date(this.form.auditBeginStr).getTime(),
        auditEnd: new Date(this.form.auditEndStr).getTime(),
        leadAuditor: this.form.leadAuditor,
        coAuditors: this.form.coAuditors,
        auditedCompany: this.form.auditedCompany,
        auditedDepartment: this.form.auditedDepartment
      }

      if (this.isEdit) {
        payload.auditId = this.initial.auditId
      }

      this.$emit('save', payload)
    }
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
.form-container input {
  width: 100%;
  padding: 6px;
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