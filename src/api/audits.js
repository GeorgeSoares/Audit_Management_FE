/*

This component here is responsible for the centralization of the API Calls related to the Audits.

I have set it according to the end points of the back-end application running locally.

*/

const BASE = 'http://localhost:8080/api/v1/audits';

export async function getAudits() {
    const response = await fetch(`${BASE}/`);
    if (!response.ok) throw new Error("Error: audits not found");
    return response.json();
}

export async function createAudit(input) {
    const response = await fetch(`${BASE}/createAudit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    })
    if (!response.ok) throw new Error("Error: audit could not be created");
    return response.text();
}

export async function updateAudit(id, input) {
    const response = await fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    });
    if (!response.ok) throw new Error("Error: audit could not be updated");
    return response.text();
}

export async function deleteAudit(auditId) {
    const response = await fetch(`${BASE}/${auditId}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error("Error: audit could not be deleted")
    return response.text();
}

