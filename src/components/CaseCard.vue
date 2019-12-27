<template>
  <div class="bg-white overflow-hidden shadow-lg md:w-30 mt-5 inline-block" 
  :class="[page === 'browse' ? 'w-full sm:w-47 sm:mx-2 mx-0 md:mx-2': page === 'suggestion'? 'w-full mx-0 md:w-full': page === 'search' ? 'w-full md:w-full sm:w-full sm:w-47 sm:mx-2 mx-0 md:mx-2': 'w-3/4 mx-5']">
    <div class="pb-2/3 relative">
      <img
        class="h-full w-full object-cover absolute"
        :src="caseData.photoURL"
        :alt="caseData.fullname"
      />
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg leading-tight truncate">
        <router-link :to="`/cases/${caseData.slug}`">
          {{ caseData.fullname }}
        </router-link>
      </h3>
      <div class=" text-gray-600 text-sm leading-relaxed mt-2">
        <div>
          <p>Age: {{ caseData.age }}</p>
          <p>Last Seen: {{ new Date(caseData.dateLastSeen).toDateString() }}</p>
        </div>
        <p class="mt-2 case-description">{{ caseData.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['caseData', 'page'],
};
</script>

<style>
.case-description{
  --max-lines: 2;
  --line-height: 1.5rem;
  max-height: calc(var(--line-height) * var(--max-lines));
  overflow: hidden;
  position: relative;
}

/* .case-description::before {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
} */

</style>
