import React, { Component } from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";

import lang_es from "./lang-es"

const DataTable = (props) => {
	return (
		<div className={"data-table-container "+(props.containerClassName?props.containerClassName:"")}>
			<MaterialTable
				style={styles.tableContainer}
				columns={props.columns}
				data={props.data}
				options={{
					...props.options,
					filtering: true,
					headerStyle: {
						backgroundColor: '#eff3f8',
						color: '#000'
					},
					actionsCellStyle: {
						display: "none",
						backgroundColor: "#eff3f8",
						zIndex: "9000"
					},
				}}
				localization={lang_es}
			/>
		</div>
	);
};

const styles = {
	tableContainer: {

	}
}
export default DataTable;
