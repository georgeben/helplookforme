
<template>
  <section class="w-full bg-gray-100">
    <div class="container">
      <div class="bg-white shadow-lg mt-1/3 sm:mt-1/4 md:mt-40 sm:w-2/3 md:w-1/2 sm:mx-auto px-4 py-6">
        <div>
          <h1 class="text-center text-xl font-semibold pb-6">Forgot Password</h1>
          <p class=" text-gray-600 text-justify w-11/12 mx-auto">
            Oops! You forgot your password? No worries! Enter your email and a password reset link would be sent to you.
          </p>
        </div>

        <form >
          <div class="w-11/12 mx-auto mt-10">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input class="border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email">
            </div>
            <button class="btn btn-primary">Submit</button>          
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name:  'forgot-password'
}
</script>

<style>

</style>