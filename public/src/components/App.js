import React, { Component, Fragment } from 'react';
import './App.css';
import BarChart from './BarChart.js';
import { data } from './DataVariables.js';
import img from './images/bg_img.jpeg';
import { useRef, useState, useEffect } from "react";

import maize_data_2020 from "./csv_files/maize_top_10_2020.csv";
import rice_data_2020 from "./csv_files/rice_top_10_2020.csv";
import wheat_data_2020 from "./csv_files/wheat_top_10_2020.csv";

import maize_2050 from "./csv_files/maize_top_10_2050_pred.csv";
import rice_2050 from "./csv_files/rice_top_10_2050_pred.csv";
import wheat_2050 from "./csv_files/wheat_top_10_2050_pred.csv";

import maize_2080 from "./csv_files/maize_top_10_2080_pred.csv";
import rice_2080 from "./csv_files/rice_top_10_2080_pred.csv";
import wheat_2080 from "./csv_files/wheat_top_10_2080_pred.csv";

import Select from 'react-select'

const App = () => {
    const plotsection = useRef(null);
    const gotoplotsection = () => window.scrollTo({
        top: plotsection.current.offsetTop,
        behavior: "smooth"
    });
    const predPlot = useRef(null);
    const gotopredPlot = () => window.scrollTo({
        top: predPlot.current.offsetTop,
        behavior: "smooth"
    });
    const width = 1300;
    const height = 650;

    const options_name = [
        { value: 'Wheat', label: 'Wheat' },
        { value: 'Rice', label: 'Rice' },
        { value: 'Maize', label: 'Maize' }
    ]

    const options_year = [
        { value: '2050', label: '2050' },
        { value: '2080', label: '2080' }
    ]

    const [category, setCategory] = useState("");
    const [year, setYear] = useState("");
    const [flag, setflag] = useState("");

    const nameHandler = (e) => {
        setCategory(e.value);
    }
    const yearHandler = (e) => {
        setYear(e.value);
    }

    useEffect(() => {
      }, [category, year])

    return (
        <>
            <div style={{
                backgroundImage: `url(${img})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh'
            }} >
                <center><br></br><br></br><br></br><br></br>
                <h1>IMPACT OF CLIMATE CHANGE ON FOOD PRODUCTION</h1></center>
                <button style={{
                    position: 'absolute',
                    top: 650,
                    left: 750,
                    borderRadius: 10,
                    height: 50
                }} onClick={gotoplotsection}>View Analysis</button>
            </div>

            <div ref={plotsection}>
                <Fragment >
                    {/* <div id="title">Maize Production</div> */}
                    <BarChart filename={maize_data_2020} datacol={data.maize_col} suptitle={data.maize_title} width={width} height={height} />
                    <BarChart filename={rice_data_2020} datacol={data.rice_col} suptitle={data.rice_title} width={width} height={height} />
                    <BarChart filename={wheat_data_2020} datacol={data.wheat_col} suptitle={data.wheat_title} width={width} height={height} />
                </Fragment>
            </div>

            <div>
                <center><h1 onClick={() => {window.location.reload()}}>Predictions</h1></center>
                <Select
                    style={{
                        position: "absolute",
                        width: '30px',
                    }}
                    options={options_name}
                    onChange={nameHandler}
                    placeholder="Select Crop"
                />
                <br/>
                <Select
                    style={{
                        width: '30px'
                    }}
                    options={options_year}
                    onChange={yearHandler}
                    placeholder="Select Year"
                />
                <br />
                <center><button onClick={() => { gotopredPlot(), setflag(1)}}>Predict Production</button></center>
                {/* <h1>Selected crop - {category} in year {year}</h1> */}

                <div ref={predPlot}>
                    {
                        flag ? (
                            category == "Wheat" && year == "2050" ? <BarChart filename={wheat_2050} datacol={data.wheat_col_2050} suptitle={data.wheat_title_2050} width={width} height={height} />
                                : (category == "Wheat" && year == "2080" ? <BarChart filename={wheat_2080} datacol={data.wheat_col_2080} suptitle={data.wheat_title_2080} width={width} height={height} />
                                    : (category == "Rice" && year == "2050" ? <BarChart filename={rice_2050} datacol={data.rice_col_2050} suptitle={data.rice_title_2050} width={width} height={height} />
                                        : (category == "Rice" && year == "2080" ? <BarChart filename={rice_2080} datacol={data.rice_col_2080} suptitle={data.rice_title_2080} width={width} height={height} />
                                            : (category == "Maize" && year == "2050" ? <BarChart filename={maize_2050} datacol={data.maize_col_2050} suptitle={data.maize_title_2050} width={width} height={height} />
                                                : (category == "Maize" && year == "2080" ? <BarChart filename={maize_2080} datacol={data.maize_col_2080} suptitle={data.maize_title_2080} width={width} height={height} />
                                                    : <p>Select crop and year</p>
                                                )))))) : <p></p>
                    }
                </div>
            </div>
        </>
    );
}

export default App;