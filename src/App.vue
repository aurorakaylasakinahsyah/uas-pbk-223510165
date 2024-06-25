<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-gradient">
      <q-toolbar>
        <q-toolbar-title class="text-black toolbar-title">🌤️SPC</q-toolbar-title>
        <q-toolbar-title class="text toolbar-title">Si Pemburu Cuaca</q-toolbar-title>
        <div class="current-time text-black bordered">{{ formattedCurrentTime }}</div>

        <q-btn-group>
          <q-btn label="Aurora Kayla S" color="pink" class="bg-pink">
            <q-menu auto-close>
              <q-list style="min-width: 200px">
                <q-item style="color: black; font-weight: 500;" to="/tugas/1" href="https://kayla-projectcv.netlify.app/">Tugas Pertemuan 1</q-item>
                <q-item style="color: black; font-weight: 500;" to="/tugas/2" href="https://github.com/aurorakaylasakinahsyah/T2-PBK-Aurora">Tugas Pertemuan 2</q-item>
                <q-item style="color: black; font-weight: 500;" to="/tugas/3" href="https://aurorakayla.netlify.app/">Tugas Pertemuan 3</q-item>
                <q-item style="color: black; font-weight: 500;" to="/tugas/4" href="https://aurorakayla-sakinahsyah-t4-prakpbk.vercel.app/">Tugas Pertemuan 4</q-item>
                <q-item style="color: black; font-weight: 500;" to="/tugas/5" href="https://t5-pbk-kayla.vercel.app/">Tugas Pertemuan 5</q-item>
                <q-item style="color: black; font-weight: 500;" to="/tugas/6" href="https://comfy-bubblegum-3de90b.netlify.app/">Tugas Pertemuan 6</q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="center center-column">
        <div class="background-image"></div>
        <div class="weather-container">
          <q-card class="q-pa-sm glass-card center-grow animated-card">
            <q-card-section>
              <div class="text-h6 text-center text-black">
                <h6 style="font-weight:600">Mau buru cuaca kota apa?</h6>
              </div>
            </q-card-section>

            <q-card-section>
              <q-input v-model="location" outlined placeholder="Ketik disini dong!" class="input-field" @keyup.enter="fetchWeather">
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
            <q-card-section class="animated-card" style="animation: moveLeftRight 5s linear infinite">
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
            </q-card-section>
          </q-card>
        </div>

        <!-- Social links -->
        <div class="social-links">
          <a href="https://www.instagram.com/aurorakaylaaa/?next=%2F" target="_blank" @click="animateIcon($event)">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" class="social-icon" />
          </a>
          <a href="https://github.com/aurorakaylasakinahsyah" target="_blank" @click="animateIcon($event)">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" class="social-icon" />
          </a>
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

    // Animation function for social icons
    const animateIcon = (event) => {
      event.target.style.transform = 'scale(3.2)';
      setTimeout(() => {
        event.target.style.transform = 'scale(1)';
      }, 200);
    };

    return {
      location,
      weather,
      fetchWeather,
      temperatureClass,
      currentTime,
      formattedCurrentTime,
      animateIcon
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
  filter: blur(2px);
  z-index: -1;
}

.weather-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.glass-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 0 10px 8px rgba(188, 132, 173, 0.884);
  width: 400px;
  margin-bottom: 9px;
  text-align: center;
}

.description-card {
  width: 900px;
}

.input-field {
  margin-bottom: 10px;
}

.social-links {
  position: absolute;
  top: 20px;
  left: 20px;
}

.social-links a {
  margin: 0 10px;
}

.social-icon {
  width: 40px;
  height: 40px;
  transition: transform 0.2s;
}

/* Toolbar title animation */
.toolbar-title {
  animation: titleAnimation 3s infinite;
}

@keyframes titleAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.toolbar-title.text {
  color: rgb(0, 0, 0); /* Mengubah warna teks menjadi hitam */
}

/* Style for bordered class */
.bordered {
  border: 2px solid #ffffff;
  padding: 5px 10px;
  border-radius: 10px;
}

/* Animation for glass card */
.animated-card {
  animation: rotate 20s linear infinite;
}

/* Animation for description card */
@keyframes moveLeftRight {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
