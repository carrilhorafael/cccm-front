import React, { useMemo, useState } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2'
import IconButton from 'atomics/IconButton';
import ProselyteFormModal from 'modules/ProselyteFormModal';
import { showModal } from 'global';
import { Actions, ChartMain, ChartMainLayout } from './ProselytesAtSemester.styles';

ChartJS.register(...registerables)

export default function ProselytesAtSemester ({ graph }) {
  const [chartType, setChartType] = useState('bar')

  const data = useMemo(
    () => Object.values(graph).map((array) => array.length)
  , [graph])

  return (
    <ChartMainLayout>
      <h3>Convertidos por mês (ultimo semestre)</h3>
      <ChartMain>
        {chartType === 'line' ?
          (
            <Line data={{
              labels: Object.keys(graph),
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
              labels: Object.keys(graph),
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
          <Actions>
            <IconButton
              theme='secondary'
              icon={chartType === 'line' ? 'fa-solid fa-chart-simple' : 'fa-solid fa-chart-line'}
              onClick={() => setChartType(chartType === 'line' ? 'bars' : 'line')}
            />
            <IconButton
              theme='primary'
              icon="fa-solid fa-square-arrow-up-right"
              onClick={() => alert('Página em desenvolvimento')}
            />
            <IconButton
              theme='primary'
              icon="fa-solid fa-user-plus"
              onClick={() => showModal(ProselyteFormModal)}
            />
          </Actions>
      </ChartMain>
    </ChartMainLayout>
  )
}
