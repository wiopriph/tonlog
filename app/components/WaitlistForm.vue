<script setup lang="ts">
defineProps<{ id: string }>()

const email = ref('')
const website = ref('')
const pending = ref(false)
const submitted = ref(false)
const error = ref('')

async function submit() {
  if (pending.value) return
  error.value = ''
  pending.value = true

  try {
    await $fetch('/api/waitlist', {
      method: 'POST',
      body: { email: email.value, website: website.value },
    })
    submitted.value = true
  }
  catch {
    error.value = 'We couldn’t save your email. Please check the address and try again.'
  }
  finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="waitlist">
    <div v-if="submitted" class="form-success" role="status" aria-live="polite">
      <span class="success-icon"><UIcon name="i-lucide-check" /></span>
      <div><strong>You’re on the list!</strong><p>We’ll let you know when Tonlog is ready to try.</p></div>
    </div>
    <form v-else class="waitlist-form" @submit.prevent="submit">
      <label :for="`${id}-email`" class="sr-only">Your email for early access</label>
      <div class="email-row">
        <UInput
          :id="`${id}-email`"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="Your email"
          required
          :maxlength="254"
          :disabled="pending"
          :aria-describedby="`${id}-note${error ? ` ${id}-error` : ''}`"
          :aria-invalid="Boolean(error)"
          size="xl"
          variant="none"
          class="email-input"
        />
        <UButton type="submit" :loading="pending" :disabled="pending" size="xl" class="interest-button">
          I’m interested <UIcon v-if="!pending" name="i-lucide-arrow-up-right" />
        </UButton>
      </div>
      <div class="honeypot" aria-hidden="true" inert>
        <label :for="`${id}-website`">Website</label>
        <input :id="`${id}-website`" v-model="website" type="text" name="website" tabindex="-1" autocomplete="off">
      </div>
      <p v-if="error" :id="`${id}-error`" class="form-error" role="alert">{{ error }}</p>
      <p :id="`${id}-note`" class="form-note">Leave your email. We’ll invite you when Tonlog is ready.</p>
    </form>
  </div>
</template>
