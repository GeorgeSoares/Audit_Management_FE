<template>
  <div class="audit-list">
    <div class="tabs">
      <input
          v-model="search"
          placeholder="Search by company or auditor"
          class="search-input"
      />
      <button class="button" @click="$emit('new')">New Audit</button>
    </div>

    <table>
      <thead>
      <tr>
        <th>Company</th>
        <th>Department</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Lead Auditor</th>
        <th>Co-Auditors</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="audit in filteredAudits" :key="audit.auditId">
        <td data-label="Company">{{ audit.auditedCompany }}</td>
        <td data-label="Department">{{ audit.auditedDepartment }}</td>
        <td data-label="Start Date">{{ formatDate(audit.auditBegin) }}</td>
        <td data-label="End Date">{{ formatDate(audit.auditEnd) }}</td>
        <td data-label="Lead Auditor">{{ audit.leadAuditor }}</td>
        <td data-label="Co-Auditors">{{ audit.coAuditors }}</td>
        <td data-label="Actions">
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
    audits: {type: Array, required: true}
  },
  data() {
    return {search: ''}
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
.audit-list {
  margin-bottom: var(--spacing);
}

.tabs {
  display: flex;
  align-items: center;
  gap: var(--spacing);
  margin-bottom: var(--spacing);
}

.search-input {
  flex: 1;
  padding: 0.5em;
  border-radius: var(--radius);
  border: 1px solid #ccc;
}

button.button {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

button.delete {
  background: #c0392b;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75em;
  border: 1px solid #ddd;
  text-align: left;
}

/* Under 468px, the table will turn to a list for better visualization */
@media (max-width: 768px) {
  table {
    display: block;
    width: 100%;
    overflow-x: auto;
  }

  thead {
    display: none;
  }

  tr {
    display: block;
    margin-bottom: var(--spacing);
    border-bottom: 1px solid #ddd;
  }

  td {
    display: flex;
    justify-content: space-between;
    padding: 0.5em 0;
  }

  td::before {
    content: attr(data-label);
    font-weight: bold;
  }
}
</style>
