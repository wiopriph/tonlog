<template>
  <UApp>
    <div class="site-shell">
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header container">
        <a href="#" class="brand" aria-label="Tonlog home">
          <span class="brand-symbol" aria-hidden="true"><span /><span /><span /></span>
          tonlog<span class="brand-period">.</span>
        </a>
        <span class="launch-status"><span class="status-dot" /> Coming soon</span>
      </header>

      <main id="main" class="main-content">
        <section class="hero container" aria-labelledby="hero-title">
          <div class="eyebrow">BUILT FOR HEAVY EQUIPMENT OWNERS</div>
          <h1 id="hero-title">Your equipment works.<br>See the <span class="highlight">results.</span></h1>
          <p class="hero-description">Jobs, repairs, fuel, and finances — all in one place.<br class="desktop-break"> Know what each machine earns, without digging<br class="desktop-break"> through chats and spreadsheets.</p>
          <WaitlistForm id="hero" />
          <p class="hero-caption"><span class="tiny-lines" aria-hidden="true">///</span> Less paperwork. More control.</p>
        </section>
      </main>

      <footer class="site-footer container">
        <span>© {{ new Date().getFullYear() }} Tonlog</span>
        <details class="privacy-details">
          <summary>How we use your email</summary>
          <p>By submitting this form, you agree to let us store your email and signup date to send you a Tonlog early access invitation and launch news. Your email is saved on our server and used only for Tonlog early access.</p>
        </details>
      </footer>
    </div>
  </UApp>
</template>
