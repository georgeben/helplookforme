<template>
  <CaseForm :edit="true" 
    :initialPersonalInformation="personalInformation"
    :initialPhysicalCharacteristics="physicalInformation"
    :initialEventDescription="eventDescription"
    :initialPhoto="photo"
    :slug="slug"/>
</template>

<script>
import CaseForm from '@/components/Forms/Case/CaseForm.vue';
import { caseEndpoint } from '../api'
import { handleError } from '../utils'

export default {
  name: 'edit-case',
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
        age: 0,
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
      slug: '',
    };
  },
  methods: {
  },
  async created(){
    // load the case from the API
    let caseSlug = this.$route.params.caseSlug;
    this.slug = caseSlug;
    try {
      let result = await caseEndpoint.getCase(caseSlug);
      let caseData = result.data.data.case;
      const dataFields = ['personalInformation', 'physicalInformation', 'eventDescription', 'photo']
       // Set the data properties
       for(let field of dataFields){
         if(field === 'physicalInformation'){
           Object.keys(this[field]).forEach(key => {
            // If the property is in caseData, set it in the data field
            if(caseData.physicalInformation[key]){
              this[field][key] = caseData.physicalInformation[key]
            }
          })
         } else {
           Object.keys(this[field]).forEach(key => {
            // If the property is in caseData, set it in the data field
            if(caseData[key]){
              this[field][key] = caseData[key]
            }
          })
         }
       }
       // Set the default value field for the residential address input
       this.$set(this.personalInformation.residentialAddress, 'address', this.personalInformation.residentialAddress.formatted_address)
       // Set the default value field for the last seen address input
       this.$set(this.eventDescription.addressLastSeen, 'address', this.eventDescription.addressLastSeen.formatted_address);
       // Change nicknames address to string
       if(this.personalInformation.nicknames)this.personalInformation.nicknames = this.personalInformation.nicknames.join(',');

    } catch (error) {
      return handleError(error)
    }
  }
};
</script>

<style>
</style>
