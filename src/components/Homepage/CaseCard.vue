<template>
  <div class="bg-white rounded-lg overflow-hidden shadow-md w-3/4 md:w-30 mx-5 mt-5 inline-block">
    <div class="bg-red-500 pb-2/3 relative">
      <img
        class="h-full w-full object-cover absolute"
        :src="caseData.photoURL"
        :alt="caseData.fullname"
      />
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg leading-tight truncate">
        {{ caseData.fullname }}
      </h3>
      <div class=" text-gray-600 text-sm leading-relaxed mt-2">
        <div>
          <p>Age: {{ caseData.age }}</p>
          <p>Last Seen: {{ new Date(caseData.dateLastSeen).toDateString() }}</p>
        </div>
        <p class="mt-2">{{ caseData.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['caseData'],
};
</script>

<style></style>
