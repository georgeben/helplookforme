<template>
  <div>
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      class="twitter-share-button"
      :data-text="text"
      data-via="helplookforme"
      data-hashtags="HelpLookForMe"
      data-show-count="false"
      data-size="large"
      >Tweet</a
    >
  </div>
</template>

<script>
export default {
  name: 'twitter-share',
  props: ['text'],
  mounted(){
    let twitterWidget = document.createElement('script');
    twitterWidget.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    document.head.appendChild(twitterWidget);
  }
}
</script>

<style>

</style>