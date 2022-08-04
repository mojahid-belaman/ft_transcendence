import React from 'react'
import ParticleBackground from '../../components/gameComponents/ParticleBackground'
import MainApp from '../../components/main/MainApp'
import SettingsComponent from '../../components/SettingsComponents/settings'

export default function Settings() {
  return (
    <MainApp>
      <ParticleBackground/>
      <SettingsComponent/>
    </MainApp>
  )
}
