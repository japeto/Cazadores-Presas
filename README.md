# CazadoresYPresas

Zorros y Conejos, Cazadores y Presas, mejor conocido como ecuaciones de Locka-Volterra discretas. 
Este es un proyecto didactico que en modo gráfico (gráfica de cantidad de zorros y cantidad de conejos conforme pasa el tiempo), donde ell usuario puede determinar las cantidades iniciales y las constantes de las ecuaciones.

Las implementaciones actuales son:

* a) La forma habitual.
* b) Sobre un retículo de dos dimensiones.
  * En cada celda puede haber N zorros y M conejos, habitualmente N=0 o M=0, en caso contrario, los zorros se comen a los conejos (a partes iguales). En cada instante de tiempo discreto, los zorros y los conejos pueden dar un pasito al azar (moverse a una celda vecina). Hay que graficar el retículo y la posición de zorros y conejos
* c) Igual que b), pero las estrategias de movimiento de zorros y conejos se hacen evolutivas (usando máquinas de estado; entradas=lo que hay en las casillas vecinas; salida=movimiento). Cada animal es un cromosoma. Los conejos se reproducen cada T1 periodos. Los zorros se reproducen por clonaje+mutación cada vez que comen conejos (un conejo les permite generar un hijo parecido al padre). 
