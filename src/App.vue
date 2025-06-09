<template>
  <div id="app">
    <h1>Audit Management</h1>
    <AuditList
        v-if="!selectedAudit && !showForm"
        :audits="audits"
        @new="showForm = true"
        @edit="onEdit"
        @view="onView"
        @delete="onDelete"
    />
    <AuditForm
        v-if="showForm && !selectedAudit"
        :initial="selected"
        @save="onSave"
        @cancel="onCancel"
    />
    <AuditDetail
        v-if="selectedAudit"
        :audit="selectedAudit"
        :findings="auditFindings"
        @close="closeDetail"
        @new-finding="onNewFinding"
        @edit-finding="onEditFinding"
        @delete-finding="onDeleteFinding"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAudits, createAudit, updateAudit, deleteAudit } from './api/audits'
import AuditList from './components/AuditList.vue'
import AuditForm from './components/AuditForm.vue'
import AuditDetail from './components/AuditDetail.vue'

export default {
  components: { AuditList, AuditForm, AuditDetail },
  setup() {
    const audits        = ref([])
    const showForm      = ref(false)
    const selected      = ref(null)
    const selectedAudit = ref(null)
    const auditFindings = ref([])

    const load = async () => {
      audits.value = await getAudits()
    }

    const onSave = async (payload) => {
      if (selected.value) {
        await updateAudit(selected.value.auditId, payload)
      } else {
        await createAudit(payload)
      }
      await load()
      resetState()
    }

    const onEdit = (audit) => {
      selected.value = audit
      showForm.value  = true
    }

    const onView = async (audit) => {
      selectedAudit.value = audit
      showForm.value      = false
      selected.value      = null
      const res = await fetch(`http://localhost:8080/api/v1/audits/${audit.auditId}/findings`)
      if (!res.ok) throw new Error("Failed to fetch findings")
      auditFindings.value = await res.json()
    }

    const closeDetail = () => {
      selectedAudit.value = null
      auditFindings.value = []
    }

    const onDelete = async (id) => {
      if (confirm("Confirm delete?")) {
        await deleteAudit(id)
        await load()
      }
    }

    const onCancel = () => {
      resetState()
    }

    const resetState = () => {
      showForm.value      = false
      selected.value      = null
      selectedAudit.value = null
      auditFindings.value = []
    }

    const onNewFinding = () => {
      // implement new finding
    }
    const onEditFinding = (finding) => {
      // implement edit finding
    }
    const onDeleteFinding = (id) => {
      // implement delete finding
    }

    onMounted(load)

    return {
      audits,
      showForm,
      selected,
      selectedAudit,
      auditFindings,
      onSave,
      onEdit,
      onView,
      closeDetail,
      onDelete,
      onCancel,
      onNewFinding,
      onEditFinding,
      onDeleteFinding
    }
  }
}
</script>
