import React, { useState } from 'react';

const Toggle = ({ isChecked }) => {
    const [checked, setChecked] = useState(isChecked);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div>

        </div>
    );
};

export default Toggle;