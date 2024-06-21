<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-gradient">
      <q-toolbar>
        <q-toolbar-title style="font-weight: 900; margin-left:25px;" class="text-black">🌤️SPC</q-toolbar-title>
        <q-toolbar-title style="font-weight: 600;margin-right:100px;font-family:Verdana, Geneva, Tahoma, sans-serif; color:black" class="text">Si Pemburu Cuaca</q-toolbar-title>



        <div class="current-time text-black">{{ formattedCurrentTime }}</div>

        <q-btn-group>
          <q-btn label="Aurora Kayla S" color="pink" class="bg-pink">
            <q-menu auto-close>
              <q-list style="min-width: 200px">
                <q-item style="color: black; font-weight: 500;"
                  to="/tugas/1"
                  href="https://kayla-projectcv.netlify.app/"
                  >Tugas Pertemuan 1</q-item>
                <q-item style="color: black; font-weight: 500;" to="/tugas/2" href="https://github.com/aurorakaylasakinahsyah/T2-PBK-Aurora"
                  >Tugas Pertemuan 2</q-item>
                <q-item style="color: black; font-weight: 500;" to="/tugas/3" href="https://aurorakayla.netlify.app/"
                  >Tugas Pertemuan 3</q-item>
                <q-item style="color: black; font-weight: 500;" to="/tugas/4" href="https://aurorakayla-sakinahsyah-t4-prakpbk.vercel.app/"
                  >Tugas Pertemuan 4</q-item>
                <q-item style="color: black; font-weight: 500;"
                  to="/tugas/5"
                  href="https://t5-pbk-kayla.vercel.app/"
                  >Tugas Pertemuan 5</q-item>
                <q-item style="color: black; font-weight: 500;"
                  to="/tugas/6"
                  href="https://comfy-bubblegum-3de90b.netlify.app/"
                  >Tugas Pertemuan 6</q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="flex flex-column">
        <div class="background-image"></div>
        <div class="weather-container">
          <q-card class="q-pa-sm glass-card flex-grow">
            <q-card-section>
              <div class="text-h6 text-center text-black">
                <h6 style="font-weight:600">Mau buru cuaca kota apa?</h6>
              </div>
            </q-card-section>

            <q-card-section>
              <q-input
                v-model="location"
                outlined
                placeholder="Ketik disini dong!"
                class="input-field"
                @keyup.enter="fetchWeather"
              >
                <template v-slot:append>
                  <q-btn label="Cari" color="pink" @click="fetchWeather" />
                </template>
              </q-input>
            </q-card-section>

            <q-card-section v-if="weather" class="weather-info">
              <div class="text-center text-black">
                <strong>Lokasi:</strong> {{ weather.name }}
              </div>
              <div :class="temperatureClass" class="text-center">
                <strong>Temperatur:</strong> {{ weather.main.temp }}°C
              </div>
              <div class="text-center text-black">
                <strong>Deskripsi:</strong> {{ weather.weather[0].description }}
              </div>
            </q-card-section>
          </q-card>

          <q-card class="q-pa-sm glass-card flex-grow description-card" style="font-family: 'Arial', sans-serif; background-color: #FFD0D0;">
  <q-card-section>
    <div class="text-h6 text-center" style="color: #333;">
      <h7 style="font-weight: 600; color: #402E7A;">Weather Type</h7>
    </div>
    
<ul style="color: #333;">
  <li><strong style="color: #ff4500;">Clear:</strong> The sky is clear without clouds, and the sunlight is bright.</li>
  <li><strong style="color: #ffa500;">Cloudy:</strong> The sky is covered with clouds, but there is no rain.</li>
  <li><strong style="color: #1e90ff;">Rain:</strong> Drops of water fall from the sky, with varying intensity.</li>
  <li><strong style="color: #8b0000;">Storm:</strong> Extreme weather with strong winds, lightning, and heavy rain.</li>
  <li><strong style="color: #4682b4;">Snow:</strong> Ice crystals fall from the sky, usually occurring in cold temperatures.</li>
</ul>
```
  </q-card-section>
</q-card>

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

export default {
  name: "App",
  setup() {
    const location = ref("");
    const weather = ref(null);
    const apiKey = "067b1a945191704a9dd18494f9711084";
    const currentTime = ref(new Date().toLocaleTimeString());
    const formattedCurrentTime = ref(formatTime(new Date()));

    const fetchWeather = async () => {
      if (location.value) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=metric`;
        try {
          const response = await axios.get(apiUrl);
          weather.value = response.data;
        } catch (error) {
          console.error(error);
        }
      }
    };

    const temperatureClass = ref("");

    // Watch weather changes to update temperatureClass
    watch(weather, (newVal) => {
      if (newVal && newVal.main.temp) {
        const temp = newVal.main.temp;
        if (temp > 30) {
          temperatureClass.value = "text-red";
        } else if (temp >= 25 && temp <= 30) {
          temperatureClass.value = "text-yellow";
        } else {
          temperatureClass.value = "text-green";
        }
      }
    });

    // Update current time every second
    const updateTime = () => {
      const now = new Date();
      currentTime.value = now.toLocaleTimeString();
      formattedCurrentTime.value = formatTime(now);
    };
    setInterval(updateTime, 1000);

    // Format time to include day, date, and time with seconds
    function formatTime(date) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const day = days[date.getDay()];
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${day}, ${formattedDate} ${formattedTime}`;
    }

    // Fetch weather data on component mount (optional)
    onMounted(() => {
      fetchWeather();
    });

    return {
      location,
      weather,
      fetchWeather,
      temperatureClass,
      currentTime,
      formattedCurrentTime,
    };
  },
};
</script>

<style>
.text-red {
  color: red;
}

.text-yellow {
  color: rgb(227, 152, 13);
}

.text-green {
  color: green;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #FFD0D0;
  color: #ffffff;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.bg-gradient {
  background-color: #ffffff;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://wallpaperaccess.com/full/3423617.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: transform 0.2s;
  padding: 8px; /* Adjusted padding for a more compact card */
  width: 300px; /* Adjust width as needed */
}

.glass-card:hover {
  transform: scale(0.99);
}

.description-card {
  margin-left: 20px;
}

.text-white {
  color: rgb(255, 255, 255);
}

.text-primary {
  color: #00bcd4;
}

.input-field .q-field__control {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: white;
}

.input-field .q-field__control:before,
.input-field .q-field__control:after {
  border-color: rgba(255, 159, 196, 0.3);
}

.input-field .q-input__inner {
  color: white;
}

.weather-info {
  margin-top: 10px; /* Adjusted margin for a more compact look */
  animation: fadeIn 1s ease-in-out;
}

.current-time {
  margin-left: auto;
  padding-right: 20px;
  animation: fadeIn 1s ease-in-out;
}

.q-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.weather-container {
  display: flex;
  flex-direction: row;
  position: relative;
  bottom: 50px; /* Adjust distance from the bottom */
  left: 20px; /* Adjust distance from the left */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
