import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logoImg from '../assets/logo-navbar.jpg';

// Registrar fuente base si fuera necesario o usar fuentes por defecto del sistema
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 0
  },
  header: {
    backgroundColor: '#0F172A',
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '5px solid #3B82F6'
  },
  logo: {
    width: 140,
    height: 60,
    objectFit: 'contain',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 8
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 20
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  subtitle: {
    fontSize: 12,
    color: '#93C5FD',
    marginTop: 5,
    textTransform: 'uppercase'
  },
  decorativeBar: {
    height: 4,
    backgroundColor: '#3B82F6',
    width: '100%',
    marginBottom: 20,
    marginTop: -5
  },
  body: {
    padding: 40,
    flexGrow: 1
  },
  sectionTitle: {
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 15,
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: 5,
    fontWeight: 'bold'
  },
  textContent: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#334155',
    textAlign: 'justify'
  },
  footer: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderTop: '1px solid #E2E8F0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center'
  },
  watermark: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    opacity: 0.03,
    width: '80%',
    transform: 'rotate(-45deg)'
  }
});

const ItineraryPDF = ({ pkg }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Decorativo */}
        <View style={styles.header}>
          <Image src={logoImg} style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{pkg.title}</Text>
            <Text style={styles.subtitle}>{pkg.continent} - {pkg.country} | Viaje tipo {pkg.type}</Text>
          </View>
        </View>

        {/* Decoración (avión vectorizado simplificado con SVG o background) - Para react-pdf usamos emojis o shapes simples */}
        <View style={styles.decorativeBar} />

        <Image src={logoImg} style={styles.watermark} />

        {/* Cuerpo del Itinerario */}
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>✈️ ITINERARIO OFICIAL DEL VIAJE</Text>
          <Text style={styles.textContent}>
            {pkg.itineraryText ? pkg.itineraryText : 'El itinerario de este viaje se encuentra en preparación por uno de nuestros asesores.'}
          </Text>
        </View>

        {/* Pie de Página */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Documento generado por Stechi Viajes. Los servicios e itinerarios descritos están sujetos a disponibilidad comercial y variaciones climáticas u operativas. Por cualquier consulta contáctese con su asesor de confianza.
          </Text>
        </View>

      </Page>
    </Document>
  );
};

export default ItineraryPDF;
