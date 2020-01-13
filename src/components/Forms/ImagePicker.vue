<template>
  <div class="text-center">
    <p class="error-info mt-4">{{errorMessage}}</p>
    <div class="relative">
      <img
        ref="image"
        class=" h-56 object-cover block mx-auto"
        :src="photo.photoURL? photo.photoURL: 'https://p7.hiclipart.com/preview/419/473/131/computer-icons-user-profile-login-user.jpg'"
      />
      <div class="overlay h-24 mt-10 mx-auto flex justify-center flex-wrap" v-if="loading" ref="overlay">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        <p class="text-sm text-dark w-full">Detecting face...</p>
      </div>
    </div>
    <input type="file" class="hidden" accept="image/*" ref="imageInput" @change="onFilePicked">
    <button class="btn bg-gray-300 hover:bg-gray-400 mt-5 mx-auto" @click="pickFile">Click to upload picture</button>
  </div>
</template>

<script>
import app from '../../utils/clarifai';
import { handleError } from '../../utils';
export default {
  name: 'image-picker',
  data(){
    return {
      photo: this.value,
      errorMessage: '',
      imageDetails: {
        clarifaiFaces: [],
        realFaces: []
      },
      loading: false,
    }
  },
  props: {
    value: {
      type: Object,
    }
  },
  created(){
    this.photo.valid = true;
  },
  methods: {
    pickFile(e) {
      e.preventDefault();
      this.$refs.imageInput.click()
    },
    onFilePicked(e){
      this.errorMessage = '';
      this.valid = false;
      this.$emit('load');
      const files = e.target.files
			if(files[0] !== undefined) {
				this.photo.imageName = files[0].name
				if(this.photo.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.photo.photoURL = fr.result
          this.photo.imageFile = files[0];
          let b64 = fr.result;
          const clarifyb64 = b64.replace(/^data:image\/(.*);base64,/, '');
          this.faceDetection(clarifyb64);
				})
			} else {
				this.photo.imageName = 'No image selected yet'
				this.photo.imageFile = ''
				this.photo.photoURL = 'https://p7.hiclipart.com/preview/419/473/131/computer-icons-user-profile-login-user.jpg'
			}
    },
    faceDetection(b64Img) {
      this.loading = true;
      app.models.predict("a403429f2ddf4b49b307e318f00e528b", {
        base64: b64Img
      }).then(
        (res) => {
          this.loading = false;
          this.$emit('done')
          var data = res.outputs[0].data.regions;
          if(!data || data.length <= 0){
            this.photo.valid = false;
            return this.errorMessage = 'No face detected, please use a better photo';
          }
          if(data.length > 1){
            this.photo.valid = false;
            this.errorMessage = 'The photo can only contain one face'
          }
          if (data !== null) {
            this.imageDetails.clarifaiFaces.push(data[0].region_info.bounding_box);
            this.photo.valid = true;
          }
        },
        function(err) {
          this.loading = false;
          this.$emit('done');
          console.log(err);
          return handleError(err);
        }
      )
    },
  }
}
</script>

<style scoped>
.overlay {
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:rgba(255, 255, 255, 0.45);
    z-index:9999;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 70px;
  height: 70px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 70px;
  height: 70px;
  margin: 10px;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>