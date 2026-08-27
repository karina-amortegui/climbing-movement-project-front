# Click Edit in MovementDetail
   ↓
MovementDetail sends the movement _id up
   ↓
App calls setEditingMovementId(id)
   ↓
editingMovementId changes
   ↓
App passes editingMovementId to MovementForm
   ↓
useEffect detects the change
   ↓
GET /movements/:id
   ↓
Backend retrieves movement from MongoDB
   ↓
Movement data returns to MovementForm
   ↓
setFormData(...) updates formData state
   ↓
React re-renders
   ↓
Controlled inputs display the new formData

# Click View in MovementList
→ MovementList sends that movement's _id to App
→ App stores selectedMovementId
→ App passes selectedMovementId to MovementDetail
→ useEffect notices the ID changed
→ MovementDetail fetches GET /movements/:id
→ the selected movement appears

# Full CRUD Loop
CREATE
React form → POST → MongoDB
→ new movement appears in list immediately

READ
Movement list → View → selected ID
→ GET /movements/:id → detail displays

UPDATE
Edit → existing data populates form
→ PATCH /movements/:id → MongoDB
→ list/detail refresh automatically

DELETE
Delete → confirmation
→ DELETE /movements/:id → MongoDB
→ list/detail/form update automatically