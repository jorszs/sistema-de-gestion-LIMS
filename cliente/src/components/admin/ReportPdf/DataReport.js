import React, { useState , useEffect} from "react";
import {getResourcesReportApi} from "../../../api/resources";
import {getSpacesReportApi} from "../../../api/spaces";
import jsPDF from 'jspdf';
import SiriusLogo from "../../../assets/img/png/sirius.png"
import Utp from "../../../assets/img/png/utp.jpg"
import 'jspdf-autotable';


export default function DataReport (props) {

    const [listaReporteRecurso, setListaReporteRecurso] = useState([]);
    const [listaReporteSpace, setListaReporteSpace] = useState([]);
    const [serv, setServ] = useState(0);

    useEffect( () => {
         getResourcesReportApi().then((response) => {
            if (response.listado.length > 0) {
                setListaReporteRecurso((listaReporteRecurso) => [...listaReporteRecurso, response.listado]);
                setServ(1)
            }
            });
        
         getSpacesReportApi().then((response) => {
            if (response.listado.length > 0) {
                setListaReporteSpace((listaReporteSpace) => [...listaReporteSpace, response.listado]);
                setServ(2)
            }
        });
    }, []);


    return (
        <div>
            <ReportePdf 
                listaRecurso = {listaReporteRecurso}
                listaEspacio = {listaReporteSpace}
                servicio = {serv}
            ></ReportePdf>
        </div>
    );
}


function ReportePdf (props) {

    const {listaRecurso, listaEspacio,servicio} = props;

    if(servicio == 2){
        debugger;
        const doc =  new jsPDF();
        var meses = new Array ("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
        var f=new Date();
        var fecha = (f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
      
        //fecha actual
        doc.setFont("times")
        doc.setFontSize(11);
        doc.text(fecha, 10, 10);//x,y
      
        //titulo
        doc.setFontSize(18);
        doc.text("UNIVERSIDAD TECNOLÓGICA DE PEREIRA", 40, 30);//x,y
        doc.text("GRUPO DE INVESTIGACIÓN SIRUS", 50, 40);
      
        //escudos
        doc.addImage(SiriusLogo, 'PNG', 110, 50, 100, 30);
        doc.addImage(Utp, 'JPEG', 60, 50, 30, 30);
      
        //subtitulo
        doc.setFontSize(18);
        doc.setFont("times", "bold")
        doc.text("Informe de Recursos y Espacios", 58, 110);
      
        var colRecurso = ["Nombre","Código","Descripción","Estado"];
        var colEspacio = ["Nombre","Descripción","Estado"];
        var rowsRecurso = [];
        var rowsEspacio = [];
        
        if(listaRecurso.length > 0){
            if(listaRecurso[0].length > 0){
                listaRecurso[0].map((item) =>{
                  var tmp = [item.name,item.code,item.description,item.state == true? "Disponible":"No Disponible"];
                  rowsRecurso.push(tmp);
                });
            }
        }
        
        if(listaEspacio.length > 0){
            if(listaEspacio[0].length > 0){
              listaEspacio[0].map((item) =>{
                var tmp = [item.name,item.description,item.state == true? "Disponible":"No Disponible"];
                rowsEspacio.push(tmp);
              });
          }
        }

        
        doc.autoTable(colRecurso, rowsRecurso, { startY: 140 });
        doc.autoTable(colEspacio, rowsEspacio);
        
        
        doc.save("InformeSIRIUS.pdf"); // will save the file in the current working directory
    }

    return null;
}
