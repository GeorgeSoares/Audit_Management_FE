<template>
  <div id="app">
    <h1>Audit Management</h1>
    <AuditList
        :audits="audits"
        @new="showForm = true"
        @edit="onEdit"
        @view="onView"
        @delete="onDelete"
    />
    <AuditForm
        v-if="showForm"
        :initial="selected"
        @save="onSave"
        @cancel="onCancel"
    />
    <!-- futuramente, AuditDetail aqui -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAudits, createAudit, updateAudit, deleteAudit } from './api/audits'
import AuditList from './components/AuditList.vue'
import AuditForm from './components/AuditForm.vue' // vamos criar em seguida

export default {
  components: { AuditList, AuditForm },
  setup() {
    const audits = ref([])
    const showForm = ref(false)
    const selected = ref(null)

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
      showForm.value = false
      selected.value = null
    }

    const onEdit = (audit) => {
      selected.value = audit
      showForm.value = true
    }

    /*const onView = (audit) => {
      // Not finished yet
    }*/

    const onDelete = async (id) => {
      if (confirm("Confirm delete?")) {
        await deleteAudit(id)
        await load()
      }
    }

    const onCancel = () => {
      showForm.value = false
      selected.value = null
    }

    onMounted(load)

    return { audits, showForm, selected, onSave, onEdit, /*onView,*/ onDelete, onCancel }
  }
}
</script>
