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
        v-if="showForm && !selectedAudit && !showFindingForm"
        :initial="selected"
        @save="onSave"
        @cancel="onCancel"
    />
    <AuditDetail
        v-if="selectedAudit && !showFindingForm"
        :audit="selectedAudit"
        :findings="auditFindings"
        @close="closeDetail"
        @new-finding="onNewFinding"
        @edit-finding="onEditFinding"
        @delete-finding="onDeleteFinding"
    />
    <FindingForm
        v-if="showFindingForm"
        :initial="selectedFinding"
        @save="handleSaveFinding"
        @cancel="onCancelFinding"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAudits, createAudit, updateAudit, deleteAudit } from './api/audits'
import AuditList from './components/AuditList.vue'
import AuditForm from './components/AuditForm.vue'
import AuditDetail from './components/AuditDetail.vue'
import FindingForm from './components/FindingForm.vue'

export default {
  components: {AuditList, AuditForm, AuditDetail, FindingForm},
  setup() {
    const audits = ref([])
    const showForm = ref(false)
    const selected = ref(null)
    const selectedAudit = ref(null)
    const auditFindings = ref([])
    const showFindingForm = ref(false)
    const selectedFinding = ref(null)

    const load = async () => {
      audits.value = await getAudits()
    }

    const onSave = async (payload) => {
      if (selected.value) {
        await updateAudit(selected.value.auditId, payload)
      } else {
        await createAudit(payload)
      }
      resetState()
      await load()
    }

    const onEdit = (audit) => {
      selected.value = audit
      showForm.value = true
    }

    const onView = async (audit) => {
      selectedAudit.value = audit
      showForm.value = false
      selected.value = null
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
      showForm.value = false
      selected.value = null
      selectedAudit.value = null
      auditFindings.value = []
      showFindingForm.value = false
      selectedFinding.value = null
    }

    const onNewFinding = () => {
      selectedFinding.value = null
      showFindingForm.value = true
    }

    const onEditFinding = (finding) => {
      selectedFinding.value = finding
      showFindingForm.value = true
    }

    const onDeleteFinding = async (id) => {
      if (!selectedAudit.value) return
      if (confirm("Confirm delete finding?")) {
        await fetch(`http://localhost:8080/api/v1/audits/${selectedAudit.value.auditId}/findings/${id}`, {method: "DELETE"})
        await onView(selectedAudit.value)
      }
    }

    const handleSaveFinding = async (payload) => {
      if (!selectedAudit.value) return
      const auditId = selectedAudit.value.auditId
      const url = payload.id
          ? `http://localhost:8080/api/v1/audits/${auditId}/findings/${payload.id}`
          : `http://localhost:8080/api/v1/audits/${auditId}/newFinding`
      const method = payload.id ? 'PUT' : 'POST'
      await fetch(url, {
        method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      })
      showFindingForm.value = false
      await onView(selectedAudit.value)
    }

    const onCancelFinding = () => {
      showFindingForm.value = false
      selectedFinding.value = null
    }

    onMounted(load)

    return {
      audits,
      showForm,
      selected,
      selectedAudit,
      auditFindings,
      showFindingForm,
      selectedFinding,
      onSave,
      onEdit,
      onView,
      closeDetail,
      onDelete,
      onCancel,
      onNewFinding,
      onEditFinding,
      onDeleteFinding,
      handleSaveFinding,
      onCancelFinding
    }
  }
}
</script>
