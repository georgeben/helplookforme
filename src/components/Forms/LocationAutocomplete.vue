<template>
 <input type="text" ref="autocomplete" :placeholder="placeholder" :value="value" @input="handleInput">
</template>

<script>
// import { hereEndpoint } from '../../api'
export default {
  name: 'location-autocomplete',
  props: {
    value: String,
    placeholder: {
      type: String,
      default: 'Enter a location'
    }
  },
  data(){
    return {
      place: {},
    }
  },  
  methods: {
    locationSelected(){
      let place = this.autocomplete.getPlace();
      this.place = place;
      let ac = place.address_components;
      let state = ac[ac.length - 2].long_name;
      let country = ac[ac.length - 1].long_name
      let lat = place.geometry.location.lat();
      let long = place.geometry.location.lng();
      let selectedLocation = {
        formatted_address: place.formatted_address,
        location: {
          type: 'Point',
          coordinates: [long, lat]
        },
        state,
        country,
      }
      this.$emit('select', selectedLocation)
      this.$emit('input', this.$refs.autocomplete.value)
    },
    handleInput(e){
      this.$emit('input', e.target.value)
    }
  },
  mounted(){
    // eslint-disable-next-line no-undef
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    );

    this.autocomplete.addListener('place_changed',this.locationSelected )
  }
}
</script>

<style>

</style>