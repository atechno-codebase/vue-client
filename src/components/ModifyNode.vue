<template>
    <b-form >
      <b-form-group label="UID: " label-for="node_uid" description="Please enter uid" >
        <b-form-input id="node_uid" v-model.trim="modifyNodeForm.uid" placeholder="Enter UID"></b-form-input>
      </b-form-group>
      <b-form-group label="Location: " label-for="node_loc" description="Please enter Location" >
        <b-form-input id="node_loc" v-model.trim="modifyNodeForm.loc" placeholder="Enter Location"></b-form-input>
      </b-form-group>
      <b-form-group label="Sublocation: " label-for="node_sloc" description="Please enter sub Location" >
        <b-form-input id="node_sloc" v-model.trim="modifyNodeForm.sloc" placeholder="Enter Sublocation"></b-form-input>
      </b-form-group>
      <b-form-group label="Machine: " label-for="node_mac" description="Please enter Machine name" >
        <b-form-input id="node_mac" v-model.trim="modifyNodeForm.mac" placeholder="Enter Machine"></b-form-input>
      </b-form-group>

      <b-form-checkbox id="_isTemp" v-model.trim="isTemp" name="checkbox1" >
                                        Temperature
      </b-form-checkbox>

        <b-form-group v-if="isTemp" label="Temperature Range: " label-for="node_temperaturer" description="Please enter Temperature Range" >
          <b-form-input class="range" type="number" id="node_temperaturen" v-model.trim="modifyNodeForm.temperaturen" placeholder="Enter Temperature Min"></b-form-input>
          <b-form-input class="range" type="number" id="node_temperaturex" v-model.trim="modifyNodeForm.temperaturex" placeholder="Enter Temperature Max"></b-form-input>
        </b-form-group>

        <b-form-checkbox
            id="_isHum" v-model.trim="isHum" name="checkbox2"
                                        >
                                        Humidity
        </b-form-checkbox>

          <b-form-group v-if="isHum" label="Humidity Range: " label-for="node_humidityr" description="Please enter Pressure Range" >
            <b-form-input class="range" type="number" id="node_humidityn" v-model.trim="modifyNodeForm.humidityn" placeholder="Enter Humidity Min"></b-form-input>
            <b-form-input class="range" type="number" id="node_humidityx" v-model.trim="modifyNodeForm.humidityx" placeholder="Enter Humidity Max"></b-form-input>
          </b-form-group>

          <b-form-checkbox
              id="_isCO2" v-model.trim="isCO2" name="checkbox3"
                                          >
                                          CO<sub>2</sub>
          </b-form-checkbox>

          <b-form-group v-if="isCO2" label="CO2 Range: " label-for="node_co2r" description="Please enter CO2 Range" >
            <b-form-input class="range" type="number" id="node_co2n" v-model.trim="modifyNodeForm.co2n" placeholder="Enter CO2 Min"></b-form-input>
            <b-form-input class="range" type="number" id="node_co2x" v-model.trim="modifyNodeForm.co2x" placeholder="Enter CO2 Max"></b-form-input>
          </b-form-group>
          <hr>

          <b-button @click="modifyNode()" variant="primary">Update Node</b-button>

    </b-form>
</template>

<script>
export default {
  name: 'ModifyNodeForm',
  props: ['sensor'],
  methods: {
    async modifyNode() {
      let node = {
        uid: this.modifyNodeForm.uid,
        location: this.modifyNodeForm.loc,
        sublocation: this.modifyNodeForm.sloc,
        machineName: this.modifyNodeForm.mac,
        co2Range: {
          min: this.modifyNodeForm.co2n,
          max: this.modifyNodeForm.co2x
        },
        temperatureRange: {
          min: this.modifyNodeForm.temperaturen,
          max: this.modifyNodeForm.temperaturex
        },
        pressureRange: {
          min: this.modifyNodeForm.pressuren,
          max: this.modifyNodeForm.pressurex
        },
        humidityRange: {
          min: this.modifyNodeForm.humidityn,
          max: this.modifyNodeForm.humidityx
        },
        isTemp: this.isTemp,
        isHum: this.isHum,
        isCO2: this.isCO2
      }
      this.$store.dispatch('modifyNode', node)
        .then(() => {
          this.$bvToast.toast('Node Modified')
          this.$bvModal.hide('nodeForm')
          this.$store.dispatch('fetchSensors', 1)
        })
        .catch((msg) => this.$bvToast.toast('Could not modified node: ' + msg))
    }
  },
  created() {
    this.modifyNodeForm = {
      uid: this.sensor.uid,
      loc: this.sensor.location,
      sloc: this.sensor.sublocation,
      mac: this.sensor.machineName,
      co2n: parseFloat(this.sensor.co2Range.min),
      co2x: parseFloat(this.sensor.co2Range.max),
      temperaturen: parseFloat(this.sensor.temperatureRange.min),
      temperaturex: parseFloat(this.sensor.temperatureRange.max),
      humidityn: parseFloat(this.sensor.humidityRange.min),
      humidityx: parseFloat(this.sensor.humidityRange.max),
    }
    this.isTemp = this.sensor.isTemperature,
    this.isHum= this.sensor.isHumidity,
    this.isCO2 = this.sensor.isCO2
  },
  data() {
    return {
      modifyNodeForm: {
      uid: null,
      loc: null,
      sloc: null,
      mac: null,
      co2n: null,
      co2x: null,
      temperaturen: null,
      temperaturex: null,
      humidityn: null,
      humidityx: null,
      },
      isTemp: null,
      isHum: null,
      isCO2: null
    }
  }
}

</script>

<style>
.container {
  height: 200px;
  display: block;
}
.range {
  width: 48%;
  float: left;
  margin-left: 2px;
}
</style>
