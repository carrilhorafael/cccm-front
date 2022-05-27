import React, { useContext, useEffect, useState } from 'react'
import { ChurchContext } from '../../context/ChurchContext'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2'
import './styles.css'
import IconButton from '../iconButton';
import ProselyteFormModal from '../modals/proselyteFormModal';
import ProselytesModal from '../modals/proselytesModal';
ChartJS.register(...registerables)

export default function ProselytesLastSemester ({ type }) {
  const [chartType, setChartType] = useState('bar')
  const { resume } = useContext(ChurchContext)

  const [resource, setResource] = useState(null)
  const [data, setData] = useState([])
  const [showProselyteFormModal, setShowProselyteFormModal] = useState(false)
  const [showProselytesModal, setShowProselytesModal] = useState(false)

  useEffect(() => {
    setData(Object.values(resume.proselytes_in_last_semester).map((array) => array.length))
  }, [resume])

  const openEditModal = (newResource) => {
    setResource(newResource)
    setShowProselyteFormModal(true)
  }

  return (
    <div className='chartMainLayout'>
      <ProselyteFormModal
        resource={resource}
        show={showProselyteFormModal}
        onHide={() => {
          setResource(null)
          setShowProselyteFormModal(false)
        }}
      />
      <ProselytesModal
        openEditModal={openEditModal}
        show={showProselytesModal}
        onHide={() => setShowProselytesModal(false)}
      />
      <h3>Convertidos por mês (ultimo semestre)</h3>
      <div className='chartMain'>
      {chartType === 'line' ?
        (
          <Line data={{
            labels: Object.keys(resume.proselytes_in_last_semester),
            datasets: [
              {
                label: 'Convertidos no mês',
                data: data,
                borderColor: '#0400aa',
                backgroundColor: '#8683EA20',
                fill: true,
                tension: 0
              }
            ]
          }}/>
        )
        :
        (
          <Bar data={{
            labels: Object.keys(resume.proselytes_in_last_semester),
            datasets: [{
              label: 'Convertidos no mês',
              data: data,
              borderColor: [
                '#C6EE86',
                '#C9F1E8',
                '#3EFCC3',
                '#97DFBC',
                '#63B4E2',
                '#B5D1EB',
                '#86D5EE',
                '#8ABBAF',
                '#2E7FC9',
                '#9889F9',
                '#A073E9',
                '#E2A3D4'
              ],
              backgroundColor: [
                '#C6EE8640',
                '#C9F1E840',
                '#3EFCC340',
                '#97DFBC40',
                '#63B4E240',
                '#B5D1EB40',
                '#86D5EE40',
                '#8ABBAF40',
                '#2E7FC940',
                '#9889F940',
                '#A073E940',
                '#E2A3D440'
              ],
              borderWidth: 3
              }]
            }}/>
          )
        }
        <div className='actionsProselyteGraph'>
          <IconButton
            icon={chartType === 'line' ? 'fa-solid fa-chart-simple' : 'fa-solid fa-chart-line'}
            onClick={() => setChartType(chartType === 'line' ? 'bars' : 'line')}
          />
          <IconButton
            icon="fa-solid fa-square-arrow-up-right"
            onClick={() => alert('Página em desenvolvimento')}
          />
          <IconButton icon="fa-solid fa-user-plus" onClick={() => setShowProselyteFormModal(true)}/>
        </div>
      </div>
    </div>
  )
}
