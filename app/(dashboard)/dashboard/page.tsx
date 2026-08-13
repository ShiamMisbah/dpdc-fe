import BalanceCard from '@/components/dashboard/BalanceCard';
import NavButtonGroup from '@/components/dashboard/NavButtonGroup';
import UtilitySelect from '@/components/dashboard/UtilitySelect';
import React from 'react'

type Props = {}


const page = (props: Props) => {
  return (
    <div className="w-full p-4">
      {/* Dashboardx Nav bar */}
      <div className="flex justify-between items-center mb-4 gap-6">
        <UtilitySelect />
        {/* User Buttons */}
        <NavButtonGroup />
      </div>
      {/* dashboard Cards vertically */}
      <div className="flex flex-col justify-start items-start">
        <BalanceCard />
        <div>Past Bills</div>
        <div>Electrical Usage</div>
      </div>
    </div>
  );
}

export default page