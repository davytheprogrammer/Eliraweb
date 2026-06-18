# Supabase → Turso: Quick Code Conversion Reference

A side-by-side comparison of common database operations.

---

## 📋 Installation & Setup

### Supabase
```bash
npm install @supabase/supabase-js
```

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

### Turso
```bash
npm install @libsql/client
```

```typescript
import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Or use the helper function
import { getTursoClient } from "@/lib/db/client";
const client = getTursoClient();
```

---

## 🔍 Basic Queries

### SELECT (Get single row)

**Supabase:**
```typescript
const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", userId)
  .single();

if (error) throw error;
const profile = data;
```

**Turso:**
```typescript
import { getOne } from "@/lib/db/queries";

const profile = await getOne(
  "SELECT * FROM profiles WHERE id = ?",
  [userId]
);
```

---

### SELECT (Get multiple rows)

**Supabase:**
```typescript
const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("role", "expert");

if (error) throw error;
const profiles = data;
```

**Turso:**
```typescript
import { getMany } from "@/lib/db/queries";

const profiles = await getMany(
  "SELECT * FROM profiles WHERE role = ?",
  ["expert"]
);
```

---

### SELECT with WHERE & ORDER BY

**Supabase:**
```typescript
const { data, error } = await supabase
  .from("consultations")
  .select("*")
  .eq("status", "pending")
  .order("created_at", { ascending: false })
  .limit(10);

if (error) throw error;
```

**Turso:**
```typescript
import { getMany } from "@/lib/db/queries";

const consultations = await getMany(
  `SELECT * FROM consultations 
   WHERE status = ? 
   ORDER BY created_at DESC 
   LIMIT ?`,
  ["pending", 10]
);
```

---

### SELECT with JOIN

**Supabase:**
```typescript
const { data, error } = await supabase
  .from("consultations")
  .select("*, experts(display_name)");

if (error) throw error;
```

**Turso:**
```typescript
import { getMany } from "@/lib/db/queries";

const consultations = await getMany(
  `SELECT c.*, e.display_name 
   FROM consultations c
   JOIN experts e ON c.expert_id = e.id`
);
```

---

## ➕ INSERT Operations

### Simple INSERT

**Supabase:**
```typescript
const { data, error } = await supabase
  .from("profiles")
  .insert([
    {
      id: userId,
      email: "user@example.com",
      first_name: "John",
      role: "user",
    },
  ]);

if (error) throw error;
```

**Turso:**
```typescript
import { executeAction } from "@/lib/db/client";

await executeAction(
  `INSERT INTO profiles (id, email, first_name, role)
   VALUES (?, ?, ?, ?)`,
  [userId, "user@example.com", "John", "user"]
);

// Or use query helper
import { createProfile } from "@/lib/db/queries";

await createProfile({
  id: userId,
  email: "user@example.com",
  firstName: "John",
  role: "user",
});
```

---

### INSERT with Returning

**Supabase:**
```typescript
const { data, error } = await supabase
  .from("consultations")
  .insert([
    {
      client_id: clientId,
      expert_id: expertId,
      status: "pending",
    },
  ])
  .select();

if (error) throw error;
const newConsultation = data[0];
```

**Turso:**
```typescript
import { getTursoClient } from "@/lib/db/client";

const consultationId = crypto.randomUUID();

await executeAction(
  `INSERT INTO consultations (id, client_id, expert_id, status)
   VALUES (?, ?, ?, ?)`,
  [consultationId, clientId, expertId, "pending"]
);

// Retrieve the created record
const newConsultation = await getOne(
  "SELECT * FROM consultations WHERE id = ?",
  [consultationId]
);
```

---

## ✏️ UPDATE Operations

### Simple UPDATE

**Supabase:**
```typescript
const { error } = await supabase
  .from("experts")
  .update({ is_verified: true })
  .eq("id", expertId);

if (error) throw error;
```

**Turso:**
```typescript
import { executeAction } from "@/lib/db/client";

await executeAction(
  `UPDATE experts SET is_verified = 1 WHERE id = ?`,
  [expertId]
);

// Or use query helper
import { approveExpert } from "@/lib/db/queries";

await approveExpert(expertId);
```

---

### UPDATE with Multiple Fields

**Supabase:**
```typescript
const { error } = await supabase
  .from("profiles")
  .update({
    first_name: newFirstName,
    last_name: newLastName,
    updated_at: new Date(),
  })
  .eq("id", userId);

if (error) throw error;
```

**Turso:**
```typescript
import { executeAction } from "@/lib/db/client";

await executeAction(
  `UPDATE profiles 
   SET first_name = ?, last_name = ?, updated_at = datetime('now')
   WHERE id = ?`,
  [newFirstName, newLastName, userId]
);
```

---

## 🗑️ DELETE Operations

### Simple DELETE

**Supabase:**
```typescript
const { error } = await supabase
  .from("experts")
  .delete()
  .eq("id", expertId);

if (error) throw error;
```

**Turso:**
```typescript
import { executeAction } from "@/lib/db/client";

await executeAction(
  `DELETE FROM experts WHERE id = ?`,
  [expertId]
);
```

---

## 🔄 Real-world Elira Health Examples

### Example 1: Create Expert (Signup)

**Supabase:**
```typescript
// Create profile
const { data: profileData, error: profileError } = await supabase
  .from("profiles")
  .insert([
    {
      id: userId,
      email: expertData.email,
      first_name: expertData.firstName,
      last_name: expertData.lastName,
      role: "expert",
    },
  ]);

// Create expert record
const { data: expertData, error: expertError } = await supabase
  .from("experts")
  .insert([
    {
      user_id: userId,
      display_name: `${expertData.firstName} ${expertData.lastName}`,
      specialties: JSON.stringify(expertData.specialties),
      is_verified: false,
    },
  ]);
```

**Turso:**
```typescript
import { createProfile, createExpert } from "@/lib/db/queries";

// Create profile
await createProfile({
  id: userId,
  email: expertData.email,
  firstName: expertData.firstName,
  lastName: expertData.lastName,
  role: "expert",
});

// Create expert record
await createExpert({
  userId,
  displayName: `${expertData.firstName} ${expertData.lastName}`,
  specialties: expertData.specialties,
});
```

---

### Example 2: Get Pending Experts (Admin)

**Supabase:**
```typescript
const { data, error } = await supabase
  .from("experts")
  .select("*, profiles!inner(email, phone_number)")
  .eq("is_verified", false)
  .order("created_at", { ascending: false });

if (error) throw error;
```

**Turso:**
```typescript
import { getMany } from "@/lib/db/queries";

const pendingExperts = await getMany(
  `SELECT e.*, p.email, p.phone_number
   FROM experts e
   JOIN profiles p ON e.user_id = p.id
   WHERE e.is_verified = 0
   ORDER BY e.created_at DESC`
);
```

---

### Example 3: Create & Get Consultation

**Supabase:**
```typescript
// Insert
const { data: consultation, error } = await supabase
  .from("consultations")
  .insert([
    {
      client_id: clientId,
      expert_id: expertId,
      issue_category: "pregnancy",
      status: "pending",
    },
  ])
  .select()
  .single();

// Get later
const { data: consultations } = await supabase
  .from("consultations")
  .select("*, experts(display_name), profiles(first_name)")
  .eq("client_id", clientId);
```

**Turso:**
```typescript
import { createConsultation, getPatientConsultations } from "@/lib/db/queries";

// Insert
const consultationId = await createConsultation({
  clientId,
  expertId,
  issueCategory: "pregnancy",
});

// Get later
const consultations = await getPatientConsultations(clientId);
```

---

### Example 4: Send & Get Messages

**Supabase:**
```typescript
// Send
const { data, error } = await supabase
  .from("consultation_messages")
  .insert([
    {
      consultation_id: consultationId,
      sender_id: senderId,
      content: messageText,
    },
  ]);

// Get
const { data: messages } = await supabase
  .from("consultation_messages")
  .select("*, profiles(first_name, last_name)")
  .eq("consultation_id", consultationId)
  .order("created_at", { ascending: true });
```

**Turso:**
```typescript
import { sendConsultationMessage, getConsultationMessages } from "@/lib/db/queries";

// Send
await sendConsultationMessage({
  consultationId,
  senderId,
  content: messageText,
});

// Get
const messages = await getConsultationMessages(consultationId);
```

---

## 🛡️ Security Patterns

### Parameterized Queries

**❌ NEVER (SQL Injection Risk):**
```typescript
// Supabase (RLS handles this)
const { data } = await supabase
  .from("profiles")
  .select("*")
  .eq("email", userEmail);

// Turso - NEVER do this:
const result = await client.execute(`SELECT * FROM profiles WHERE email = '${userEmail}'`);
```

**✅ ALWAYS:**
```typescript
// Turso - Use parameterized queries:
const result = await client.execute({
  sql: "SELECT * FROM profiles WHERE email = ?",
  args: [userEmail],
});

// Or use helper:
const profile = await getOne(
  "SELECT * FROM profiles WHERE email = ?",
  [userEmail]
);
```

---

## ⚡ Performance Tips

### Supabase → Turso

| Supabase | Turso |
|----------|-------|
| RLS handles permissions | Check `role` in middleware |
| Indexes auto-optimized | Create indexes in schema.sql |
| Real-time subscriptions | Not available (poll instead) |
| Built-in auth | Implement custom in `profiles.role` |

---

## 📊 Common Patterns

### Pattern: Transaction-like Batch

**Supabase:**
```typescript
// Supabase doesn't have built-in transactions via JS client
// But PostgreSQL has ACID guarantees
await supabase.from("table1").insert([...]);
await supabase.from("table2").insert([...]);
```

**Turso:**
```typescript
import { executeBatch } from "@/lib/db/client";

await executeBatch([
  {
    sql: "INSERT INTO table1 (...) VALUES (...)",
    params: [...],
  },
  {
    sql: "INSERT INTO table2 (...) VALUES (...)",
    params: [...],
  },
]);

// Note: SQLite doesn't support true transactions via REST API,
// but you can execute statements sequentially
```

---

## 🧪 Testing

### Supabase Test Setup
```typescript
const supabase = createClient(testUrl, testKey);
const { data } = await supabase.from("test").select("*");
```

### Turso Test Setup
```typescript
process.env.TURSO_CONNECTION_URL = "file::memory:";
process.env.TURSO_AUTH_TOKEN = "test";

const client = getTursoClient();
const result = await client.execute("SELECT 1");
```

---

## 📚 Mapping Summary

| Operation | Supabase | Turso |
|-----------|----------|-------|
| **Get one** | `.select().eq().single()` | `getOne(sql, params)` |
| **Get many** | `.select().eq()` | `getMany(sql, params)` |
| **Insert** | `.insert([])` | `executeAction(sql, params)` |
| **Update** | `.update().eq()` | `executeAction(sql, params)` |
| **Delete** | `.delete().eq()` | `executeAction(sql, params)` |
| **Join** | `.select("*, table!inner(...)")` | `JOIN in SQL` |
| **Order** | `.order("field", {ascending: true})` | `ORDER BY field ASC/DESC` |
| **Limit** | `.limit(10)` | `LIMIT 10` |
| **Count** | `.select("*", {count: "exact"})` | `SELECT COUNT(*) FROM ...` |

---

This reference should help you quickly convert any Supabase code to Turso!

For more details, see the full migration guide: `TURSO_MIGRATION_GUIDE.md`
