<template>
  <div class="container">
    <h2> Register New User </h2>
    <b-form class="main-form">
      <b-form-group label="Username: " label-for="reg_username" description="Please enter unique username." >
        <b-form-input v-model.trim="regUserForm.username" id="reg_username" placeholder="Enter username"></b-form-input>
      </b-form-group>
      <b-form-group label="Email: " label-for="reg_email" description="Please enter valid email" >
        <b-form-input id="reg_email" v-model.trim="regUserForm.email" placeholder="Enter your email" type="email" ></b-form-input>
      </b-form-group>
      <!-- <b-form-group label="Password: " label-for="reg_pwd" description="Please enter strong password" > -->
      <!--   <b-form-input id="reg_pwd" v-model.trim="regUserForm.password" type="password" placeholder="Your password here" ></b-form-input> -->
      <!-- </b-form-group> -->
      <b-form-group label="Institute" label-for="reg_institute" description="This should be consistent with your other users" >
        <b-form-input id="reg_institute" v-model.trim="regUserForm.institute" placeholder="The name of your institue" ></b-form-input>
      </b-form-group>
      <b-form-group label="Role/Designation" label-for="reg_designation" description="The role you want to assign the user." >
         <b-form-select id="reg_designation" v-model.trim="regUserForm.designation" :options="designationOptions" ></b-form-select>
      </b-form-group>
      <b-button @click="registerUser()" variant="primary">Create User</b-button>
    </b-form>
  </div>
</template>

<script>

import { getDesignationOptions } from '../common/designation'

export default {
  name: 'RegisterForm',
  methods: {
    async registerUser() {
      this.$store.dispatch('register', this.regUserForm)
        .then(() => {
          this.$bvToast.toast('Registered Successfully')
          this.$root.$off('bv::modal::hide')
        }).catch((e) => {
          this.$bvToast.toast('Could not Register: ' + e)
          console.log(e)
        })
    }
  },
  data() {
    return {
      regUserForm: {
        username: '',
        password: '',
        email: '',
        institute: '',
        designation: null
      },
      designationOptions: []
    }
  },
  beforeDestroy() {
    this.$root.$off('bv::modal::hide')
  },
  mounted () {
    this.designationOptions = getDesignationOptions(
      this.$store.getters.getDesignation
    )
  }
}
</script>

<style>
.main-form {
  margin-bottom: 10px;
  margin-top: 0px;
}
</style>
