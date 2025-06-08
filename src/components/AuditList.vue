<template>
  <div>
    <div class="tabs">
      <input
          v-model="search"
          placeholder="Search for company or Auditor"
          class="search-input"
      />
      <button class="button" @click="$emit('new')">New Audit</button>
    </div>

    <table>
      <thead>
      <tr>
        <th>Company</th>
        <th>Department</th>
        <th>Begin</th>
        <th>End</th>
        <th>Lead Auditor</th>
        <th>Co-Auditors</th>
        <th>Findings</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="audit in filteredAudits"
          :key="audit.auditId"
      >
        <td>{{ audit.auditedCompany }}</td>
        <td>{{ audit.auditedDepartment }}</td>
        <td>{{ formatDate(audit.auditBegin) }}</td>
        <td>{{ formatDate(audit.auditEnd) }}</td>
        <td>{{ audit.leadAuditor }}</td>
        <td>{{ audit.coAuditors }}</td>
        <td>
          <button class="button" @click="$emit('edit', audit)">Edit</button>
          <button class="button delete" @click="$emit('delete', audit.auditId)">Delete</button>
          <button class="button" @click="$emit('view', audit)">View</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AuditList',
  props: {
    audits: { type: Array, required: true }
  },
  data() {
    return { search: '' }
  },
  computed: {
    filteredAudits() {
      if (!this.search) return this.audits
      const s = this.search.toLowerCase()
      return this.audits.filter(a =>
          a.auditedCompany.toLowerCase().includes(s) ||
          a.leadAuditor.toLowerCase().includes(s)
      )
    }
  },
  methods: {
    formatDate(ts) {
      return new Date(ts).toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.search-input {
  margin-bottom: 10px;
  padding: 5px;
  width: 300px;
}
.button {
  margin-left: 10px;
}
.delete {
  background: #dc3545;
}
</style>
