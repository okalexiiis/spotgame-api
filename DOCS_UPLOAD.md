# Proceso de Subida de Archivos (Pre-signed URLs)

Este documento detalla el flujo de trabajo para subir archivos (videos de trailers, imágenes de portada, avatares, etc.) a Cloudflare R2 utilizando la API de GameSpot.

## Resumen del Flujo

El sistema utiliza un patrón de **Pre-signed URLs** para permitir que el cliente suba archivos pesados directamente al almacenamiento en la nube sin sobrecargar el servidor de la API.

1.  **Solicitud de Permiso:** El cliente pide una URL temporal de subida.
2.  **Subida Directa:** El cliente sube el archivo al storage usando la URL recibida.
3.  **Registro en DB:** El cliente informa a la API que la subida terminó enviando la URL pública.

---

## Paso 1: Generar URL Pre-firmada

**Endpoint:** `POST /api/v1/upload/presign`  
**Autenticación:** Requerida (Bearer Token)

### Request Body
```json
{
  "filename": "mi-video.mp4",
  "contentType": "video/mp4",
  "folder": "trailers/videos"
}
```

### Carpetas Disponibles (`folder`)
*   `avatars`: Fotos de perfil.
*   `juegos`: Imágenes de portada y banners de videojuegos.
*   `noticias`: Imágenes para artículos de noticias.
*   `trailers/videos`: Archivos de video para trailers.
*   `trailers/posters`: Imágenes miniatura (posters) para trailers.

### Response
```json
{
  "presignedUrl": "https://<account-id>.r2.cloudflarestorage.com/bucket/folder/uuid.mp4?X-Amz-Algorithm=...",
  "publicUrl": "https://pub-xxxx.r2.dev/folder/uuid.mp4",
  "storageKey": "folder/uuid.mp4"
}
```

---

## Paso 2: Subida al Almacenamiento

El cliente debe realizar una petición `PUT` a la `presignedUrl` obtenida.

*   **Método:** `PUT`
*   **Headers:** `Content-Type` (debe coincidir con el enviado en el Paso 1).
*   **Body:** El archivo binario.

```bash
# Ejemplo con curl
curl -X PUT -T "./video.mp4" -H "Content-Type: video/mp4" "URL_RECIBIDA_EN_PASO_1"
```

---

## Paso 3: Registro de Metadatos en la API

Una vez que la subida al storage es exitosa (HTTP 200), se debe enviar la `publicUrl` al endpoint correspondiente para guardar la referencia en la base de datos.

### Ejemplo: Crear un Trailer
**Endpoint:** `POST /api/v1/trailers`

```json
{
  "idJuego": "uuid-del-juego",
  "titulo": "Trailer Oficial",
  "urlVideo": "https://pub-xxxx.r2.dev/trailers/videos/uuid.mp4",
  "urlPoster": "https://pub-xxxx.r2.dev/trailers/posters/uuid-poster.jpg"
}
```

### Ejemplo: Actualizar Portada de Juego
**Endpoint:** `PUT /api/v1/juegos/{id}`

```json
{
  "imagenPortada": "https://pub-xxxx.r2.dev/juegos/uuid.jpg"
}
```

---

## Ventajas del Sistema
1.  **Escalabilidad:** El servidor no procesa los bytes del archivo, evitando cuellos de botella.
2.  **Seguridad:** El cliente nunca maneja llaves secretas del storage, solo tokens temporales de un solo uso.
3.  **Confiabilidad:** Se utiliza la infraestructura global de Cloudflare para manejar la carga de datos.
