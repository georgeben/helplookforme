<template>
  <div class="text-center">
    <img
      class=" h-56 object-cover block mx-auto"
      :src="photo.imageUrl"
    />
    <input type="file" class="hidden" accept="image/*" ref="imageInput" @change="onFilePicked">
    <button class="btn bg-gray-300 hover:bg-gray-400 mt-5 mx-auto" @click="pickFile">Click to upload picture</button>
  </div>
</template>

<script>
export default {
  name: 'image-picker',
  data(){
    return {
      photo: this.value,
    }
  },
  props: {
    value: {
      type: Object,
    }
  },
  methods: {
    pickFile(e) {
      e.preventDefault();
      this.$refs.imageInput.click()
    },
    onFilePicked(e){
      const files = e.target.files
			if(files[0] !== undefined) {
        /* TODO Facial detection - Try to detect a face in the image the user picks
          If no face is detected, tell the  user to pick a better photo. This will prevent
          users from uploading rubbish*/
				this.photo.imageName = files[0].name
				if(this.photo.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.photo.imageUrl = fr.result
					this.photo.imageFile = files[0] 
				})
			} else {
				this.photo.imageName = 'No image selected yet'
				this.photo.imageFile = ''
				this.photo.imageUrl = 'https://p7.hiclipart.com/preview/419/473/131/computer-icons-user-profile-login-user.jpg'
			}
    }
  }
}
</script>

<style>

</style>