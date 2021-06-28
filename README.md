## Aplicación de Audio en JS
Esta aplicación de audio se desarrollo anteriormente pero carente de una estructura solida se mejoraron algunas funciones.

En esta ocasión se desarrollo la app considerando la documentación en 
[API WEB Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

Esta aplicación contiene módulos como:

- **Global** : Donde se encuentran los elementos Dom referenciados.
- **Extend** : Donde se provee de las funcionalidades para audio.
- **Frame** : Donde conectamos con la Web APi Audio.
- _**App**_: Y el módulo principal donde hacemos uso a las referencias del Dom.

Se debe considerar que si queremos hacer algun cambio sin afectar algun módulo solo debe usar **GLOBAL**.

``` 
 //para proveer de medios como audio
 list:[
    { name:'Holaa', src:'mi-cancion.mp3', 
      img:'mi-imagen.jpg', text:'Descripcion de mi cancion' }
 ]
 //todas la referencias con respecto al path de los medios se encuentran en extend.js
```

