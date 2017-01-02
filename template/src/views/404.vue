<template>
  <div class="NoPage">
    <h3>Page Not Found</h3>
    <p>We're sorry, but the page you requested cannot be found.</p>
    <a href="http://www.echo58.com">Powered by <strong>Echo</strong></a>
  </div>
</template>

<style lang="scss">
  @import '~assets/sass/config';
  .NoPage {
    padding: 2rem 20px 20px;
    flex-direction: column;
    @include center-flex;
    text-align: center;
    color: #555;
    h3 {
      font-size: 25px;
      margin-bottom: 10px;
    }
    a {
      position: fixed;
      left: 0;
      bottom: 20px;
      color: #ccc;
      width: 100%;
      text-align: center;
    }
  }
</style>
