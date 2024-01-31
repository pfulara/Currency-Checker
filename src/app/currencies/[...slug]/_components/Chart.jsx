'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip bg-white text-black p-3 rounded-md'>
        <p className='label'>{`${label}`}</p>
        <p className='desc'>{`1 ${payload[0].payload.base} = ${payload[0].value} ${payload[0].payload.currency}`}</p>
      </div>
    );
  }

  return null;
};

export default function Chart({ data }) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='2 2' />
        <XAxis dataKey='date' />
        <YAxis domain={[0, (dataMax) => dataMax * 2]} />
        <Tooltip content={<CustomTooltip />} />
        <Area type='monotone' dataKey='value' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    </ResponsiveContainer>
  );
}
