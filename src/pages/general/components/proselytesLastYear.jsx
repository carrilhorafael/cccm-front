import React, { useContext, useEffect } from 'react'
import { ChurchesContext } from '../../../context/ChurchesContext'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2'
ChartJS.register(...registerables)

export default function ProselytesLastYear ({ type }) {
  const { resume } = useContext(ChurchesContext)

  const getValue = () => {
    return Object.values(resume.proselytes_in_last_semester).map((array) => array.length)
  }

  // const data =

  if (resume.proselytes_in_last_semester) {
    return (
      <>
        {type === 'line' ?
        (
          <Line data={{
            labels: Object.keys(resume.proselytes_in_last_semester),
            datasets: [
              {
                label: 'Convertidos no mês',
                data: getValue(),
                borderColor: '#0400aa',
                backgroundColor: '#8683EA20',
                fill: true,
                tension: 0
              }
            ]
          }}/>
        ) : (
          <Bar data={{
            labels: Object.keys(resume.proselytes_in_last_semester),
            datasets: [{
              label: 'Convertidos no mês',
              data: getValue(),
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
      </>
    )
  } else {
    return <></>
  }
}
