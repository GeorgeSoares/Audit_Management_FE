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

    <div class="audit-cards-container">
      <div v-for="audit in filteredAudits" :key="audit.auditId" class="audit-card">
        <div class="audit-card-item">
          <span class="label">Company:</span>
          <span class="value">{{ audit.auditedCompany }}</span>
        </div>
        <div class="audit-card-item">
          <span class="label">Department:</span>
          <span class="value">{{ audit.auditedDepartment }}</span>
        </div>
        <div class="audit-card-item">
          <span class="label">Start Date:</span>
          <span class="value">{{ formatDate(audit.auditBegin) }}</span>
        </div>
        <div class="audit-card-item">
          <span class="label">End Date:</span>
          <span class="value">{{ formatDate(audit.auditEnd) }}</span>
        </div>
        <div class="audit-card-item">
          <span class="label">Lead Auditor:</span>
          <span class="value">{{ audit.leadAuditor }}</span>
        </div>
        <div class="audit-card-item">
          <span class="label">Co-Auditors:</span>
          <span class="value">{{ audit.coAuditors }}</span>
        </div>
        <div class="audit-card-actions">
          <button class="button" @click="$emit('edit', audit)">Edit</button>
          <button class="button delete" @click="$emit('delete', audit.auditId)">Delete</button>
          <button class="button" @click="$emit('view', audit)">View</button>
        </div>
      </div>
    </div>

    <table class="audit-table-desktop">
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
  margin: 5px;
  padding: 0.5em 1em;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
}

button.delete {
  background: #c0392b;
}

.audit-table-desktop {
  width: 100%;
  background: #f9f9f9;
  border-spacing: 0;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid #ddd;
}

.audit-table-desktop th,
.audit-table-desktop td {
  padding: 0.75em;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.audit-table-desktop thead th:first-child {
  border-top-left-radius: var(--radius);
}

.audit-table-desktop thead th:last-child {
  border-top-right-radius: var(--radius);
}

.audit-table-desktop tbody tr:last-child td:first-child {
  border-bottom-left-radius: var(--radius);
}

.audit-table-desktop tbody tr:last-child td:last-child {
  border-bottom-right-radius: var(--radius);
}

.audit-cards-container {
  display: none;
}

/* Under 768px, the audit table will turn to a list with cards for better visualization */
@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: 100%;
    margin-bottom: var(--spacing);
  }

  .tabs .button {
    width: 100%;
    margin-bottom: var(--spacing);
  }

  .audit-table-desktop {
    display: none;
  }
  .audit-cards-container {
    display: block;
    width: 100%;
  }

  .audit-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: var(--radius);
    padding: var(--spacing);
    margin-bottom: var(--spacing);
    box-sizing: border-box;
  }

  .audit-card-item {
    display: flex;
    justify-content: space-between;
    padding: 0.25em 0;
  }

  .audit-card-item:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  .audit-card-item .label {
    font-weight: bold;
    color: #555;
  }

  .audit-card-item .value {
    text-align: right;
  }

  .audit-card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-top: var(--spacing);
    justify-content: flex-end;
  }

  .audit-card-actions .button {
    flex: 1 1 auto;
    margin: 0;
  }
}
</style>