<template>
  <CaseForm :edit="false" 
    :initialPersonalInformation="personalInformation"
    :initialPhysicalCharacteristics="physicalInformation"
    :initialEventDescription="eventDescription"
    :initialPhoto="photo"/>
</template>

<script>
import CaseForm from '@/components/Forms/Case/CaseForm.vue';

export default {
  name: 'report-case',
  components: {
    CaseForm,
  },
  data() {
    return {
      personalInformation: {
        fullname: '',
        nicknames: '',
        residentialAddress: {
          state: '',
          country: '',
          formatted_address: '', // The address from the Google places API
          address: '', // The value in the address field
        },
        language: '',
        age: '',
        gender: '',
      },
      physicalInformation: {
        height: '',
        weight: '',
        healthInformation: '',
        specialCharacteristics: '',
      },
      eventDescription: {
        addressLastSeen: {
          state: '',
          country: '',
          formatted_address: '', // The address from the Google places API
          address: '', // The value in the address field
        },
        dateLastSeen: new Date(),
        lastSeenClothing: '',
        eventCircumstances: '',
      },
      photo: {
        imageName: '',
        photoURL: '',
        imageFile: '',
      },
    };
  },
  methods: {
  },
};
</script>

<style>
</style>
