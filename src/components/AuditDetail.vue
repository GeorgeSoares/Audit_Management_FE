<template>
  <div class="detail-container">
    <button class="button close-button" @click="$emit('close')">
      Back to List
    </button>
    <h2>Audit Details</h2>

    <p><strong>Company:</strong> {{ audit.auditedCompany }}</p>
    <p><strong>Department:</strong> {{ audit.auditedDepartment }}</p>
    <p><strong>Start Date:</strong> {{ formatDate(audit.auditBegin) }}</p>
    <p><strong>End Date:</strong> {{ formatDate(audit.auditEnd) }}</p>
    <p><strong>Lead Auditor:</strong> {{ audit.leadAuditor }}</p>
    <p><strong>Co-Auditors:</strong> {{ audit.coAuditors }}</p>

    <h3>Related Findings</h3>
    <div v-if="findings.length === 0">
      <em>No findings for this audit.</em>
    </div>
    <div v-else class="finding-list">
      <table>
        <thead>
        <tr>
          <th>Assessment</th>
          <th>Title</th>
          <th>Description</th>
          <th>Responsible</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        </thead>
      <tbody>
      <tr v-for="f in findings" :key="f.findingNumber">
        <td data-label="Assessment">{{ f.assessment }}</td>
        <td data-label="Title">{{ f.findingTitle }}</td>
        <td data-label="Description">{{ f.findingDescription }}</td>
        <td data-label="Responsible">{{ f.responsiblePerson }}</td>
        <td data-label="Status">{{ f.status || '-' }}</td>
        <td data-label="Actions">
          <button class="button" @click="$emit('edit-finding', f)">Edit</button>
          <button class="button delete" @click="$emit('delete-finding', f)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    </div>

    <button class="button" @click="$emit('new-finding')">
      Add Finding
    </button>
  </div>
</template>

<script>
export default {
  name: 'AuditDetail',
  props: {
    audit:    { type: Object, required: true },
    findings: { type: Array,  default: () => [] }
  },
  methods: {
    formatDate(ts) {
      return new Date(ts).toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.detail-container {
  background: #e4eceb;
  padding: 20px;
  border-radius: 6px;
  margin: 20px auto;
  max-width: 800px;
}

.finding-list table {
  width: 100%;
  border-collapse: collapse;
}

.finding-list th,
.finding-list td {
  padding: 0.75em;
  border: 1px solid #ccc;
  text-align: left;
}

.button {
  padding: 6px 10px;
  margin: 5px;
}
.close-button {
  float: right;
  background: #6c757d;
  color: white;
}
.delete {
  background: #dc3545;
  color: white;
}
</style>
