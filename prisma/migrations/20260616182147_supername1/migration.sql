-- CreateTable
CREATE TABLE "roles" (
    "id_rol" UUID NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "idiomas" (
    "id_idioma" UUID NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "bandera_url" VARCHAR(255),
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "idiomas_pkey" PRIMARY KEY ("id_idioma")
);

-- CreateTable
CREATE TABLE "plataformas" (
    "id_plataforma" UUID NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "tipo" VARCHAR(50),
    "icono_url" VARCHAR(255),

    CONSTRAINT "plataformas_pkey" PRIMARY KEY ("id_plataforma")
);

-- CreateTable
CREATE TABLE "generos" (
    "id_genero" UUID NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "icono_url" VARCHAR(255),

    CONSTRAINT "generos_pkey" PRIMARY KEY ("id_genero")
);

-- CreateTable
CREATE TABLE "categorias_trailer" (
    "id_categoria" UUID NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "categorias_trailer_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" UUID NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50),
    "correo" VARCHAR(150) NOT NULL,
    "contrasena_hash" VARCHAR(255) NOT NULL,
    "fecha_registro" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultima_sesion" TIMESTAMP(6),
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "avatar_url" VARCHAR(255),
    "pais" VARCHAR(100),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "usuario_roles" (
    "id" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_rol" UUID NOT NULL,
    "fecha_asignacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuracion_usuario" (
    "id_config" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "idioma" UUID,
    "tema" VARCHAR(20),
    "email_notificaciones" BOOLEAN NOT NULL DEFAULT true,
    "notificaciones_push" BOOLEAN NOT NULL DEFAULT true,
    "privacidad_perfil" VARCHAR(20),
    "control_parental" BOOLEAN NOT NULL DEFAULT false,
    "calidad_video" VARCHAR(20) NOT NULL DEFAULT 'auto',
    "tamano_texto" VARCHAR(20) NOT NULL DEFAULT 'normal',
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "configuracion_usuario_pkey" PRIMARY KEY ("id_config")
);

-- CreateTable
CREATE TABLE "sesiones" (
    "id_sesion" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "fecha_inicio" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_fin" TIMESTAMP(6),
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sesiones_pkey" PRIMARY KEY ("id_sesion")
);

-- CreateTable
CREATE TABLE "notificaciones" (
    "id_notificacion" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "mensaje" TEXT NOT NULL,
    "tipo" VARCHAR(50),
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_lectura" TIMESTAMP(6),
    "entidad" VARCHAR(50),
    "entidad_id" UUID,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id_notificacion")
);

-- CreateTable
CREATE TABLE "logs_actividad" (
    "id_log" UUID NOT NULL,
    "id_usuario" UUID,
    "accion" VARCHAR(100) NOT NULL,
    "entidad" VARCHAR(100) NOT NULL,
    "entidad_id" UUID,
    "detalles" JSONB,
    "ip_address" VARCHAR(45),
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_actividad_pkey" PRIMARY KEY ("id_log")
);

-- CreateTable
CREATE TABLE "juegos" (
    "id_juego" UUID NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "descripcion" TEXT,
    "fecha_lanzamiento" DATE,
    "desarrollador" VARCHAR(150),
    "editor" VARCHAR(150),
    "imagen_portada" VARCHAR(255),
    "banner_url" VARCHAR(255),
    "estado" VARCHAR(20),
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "juegos_pkey" PRIMARY KEY ("id_juego")
);

-- CreateTable
CREATE TABLE "juego_generos" (
    "id" UUID NOT NULL,
    "id_juego" UUID NOT NULL,
    "id_genero" UUID NOT NULL,

    CONSTRAINT "juego_generos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "juego_plataformas" (
    "id" UUID NOT NULL,
    "id_juego" UUID NOT NULL,
    "id_plataforma" UUID NOT NULL,

    CONSTRAINT "juego_plataformas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favoritos" (
    "id_favorito" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_juego" UUID NOT NULL,
    "fecha_agregado" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoritos_pkey" PRIMARY KEY ("id_favorito")
);

-- CreateTable
CREATE TABLE "descargas" (
    "id_descarga" UUID NOT NULL,
    "id_usuario" UUID,
    "id_juego" UUID NOT NULL,
    "fecha_descarga" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plataforma" VARCHAR(100),

    CONSTRAINT "descargas_pkey" PRIMARY KEY ("id_descarga")
);

-- CreateTable
CREATE TABLE "proximos_lanzamientos" (
    "id_lanzamiento" UUID NOT NULL,
    "id_juego" UUID NOT NULL,
    "fecha_lanzamiento" DATE,
    "ventana_lanzamiento" VARCHAR(100),
    "descripcion" TEXT,
    "banner_url" VARCHAR(255),
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proximos_lanzamientos_pkey" PRIMARY KEY ("id_lanzamiento")
);

-- CreateTable
CREATE TABLE "trailers" (
    "id_trailer" UUID NOT NULL,
    "id_juego" UUID NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "tipo" VARCHAR(50),
    "url_video" VARCHAR(255),
    "url_poster" VARCHAR(255),
    "orden" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subido_por" UUID,
    "estado_revision" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    "motivo_rechazo" TEXT,
    "estado_archivo" VARCHAR(20) NOT NULL DEFAULT 'subiendo',
    "storage_key" VARCHAR(255),
    "duracion_segundos" INTEGER,
    "tamano_bytes" BIGINT,
    "vistas" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "trailers_pkey" PRIMARY KEY ("id_trailer")
);

-- CreateTable
CREATE TABLE "trailer_categorias" (
    "id" UUID NOT NULL,
    "id_trailer" UUID NOT NULL,
    "id_categoria" UUID NOT NULL,

    CONSTRAINT "trailer_categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noticias" (
    "id_noticia" UUID NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "resumen" TEXT,
    "contenido" TEXT NOT NULL,
    "imagen_portada" VARCHAR(255),
    "fecha_publicacion" TIMESTAMP(6),
    "autor_id" UUID,
    "destacada" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "noticias_pkey" PRIMARY KEY ("id_noticia")
);

-- CreateTable
CREATE TABLE "imagenes_noticias" (
    "id" UUID NOT NULL,
    "id_noticia" UUID NOT NULL,
    "url_imagen" VARCHAR(255) NOT NULL,
    "orden" SMALLINT NOT NULL DEFAULT 0,
    "leyenda" VARCHAR(255),

    CONSTRAINT "imagenes_noticias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservas" (
    "id_reserva" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "id_lanzamiento" UUID NOT NULL,
    "fecha_reserva" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id_reserva")
);

-- CreateTable
CREATE TABLE "qr_login" (
    "codigo" VARCHAR(8) NOT NULL,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    "id_usuario" UUID,
    "creado_en" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expira_en" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "qr_login_pkey" PRIMARY KEY ("codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_nombre_key" ON "roles"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "idiomas_codigo_key" ON "idiomas"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "generos_nombre_key" ON "generos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_trailer_nombre_key" ON "categorias_trailer"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_roles_id_usuario_id_rol_key" ON "usuario_roles"("id_usuario", "id_rol");

-- CreateIndex
CREATE UNIQUE INDEX "configuracion_usuario_id_usuario_key" ON "configuracion_usuario"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "sesiones_token_key" ON "sesiones"("token");

-- CreateIndex
CREATE INDEX "notificaciones_id_usuario_leida_idx" ON "notificaciones"("id_usuario", "leida");

-- CreateIndex
CREATE UNIQUE INDEX "juegos_slug_key" ON "juegos"("slug");

-- CreateIndex
CREATE INDEX "juegos_destacado_idx" ON "juegos"("destacado");

-- CreateIndex
CREATE UNIQUE INDEX "juego_generos_id_juego_id_genero_key" ON "juego_generos"("id_juego", "id_genero");

-- CreateIndex
CREATE UNIQUE INDEX "juego_plataformas_id_juego_id_plataforma_key" ON "juego_plataformas"("id_juego", "id_plataforma");

-- CreateIndex
CREATE UNIQUE INDEX "favoritos_id_usuario_id_juego_key" ON "favoritos"("id_usuario", "id_juego");

-- CreateIndex
CREATE UNIQUE INDEX "proximos_lanzamientos_id_juego_key" ON "proximos_lanzamientos"("id_juego");

-- CreateIndex
CREATE INDEX "trailers_estado_revision_idx" ON "trailers"("estado_revision");

-- CreateIndex
CREATE UNIQUE INDEX "trailer_categorias_id_trailer_id_categoria_key" ON "trailer_categorias"("id_trailer", "id_categoria");

-- CreateIndex
CREATE UNIQUE INDEX "noticias_slug_key" ON "noticias"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "reservas_id_usuario_id_lanzamiento_key" ON "reservas"("id_usuario", "id_lanzamiento");

-- AddForeignKey
ALTER TABLE "usuario_roles" ADD CONSTRAINT "usuario_roles_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_roles" ADD CONSTRAINT "usuario_roles_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "roles"("id_rol") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configuracion_usuario" ADD CONSTRAINT "configuracion_usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configuracion_usuario" ADD CONSTRAINT "configuracion_usuario_idioma_fkey" FOREIGN KEY ("idioma") REFERENCES "idiomas"("id_idioma") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesiones" ADD CONSTRAINT "sesiones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_actividad" ADD CONSTRAINT "logs_actividad_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "juego_generos" ADD CONSTRAINT "juego_generos_id_juego_fkey" FOREIGN KEY ("id_juego") REFERENCES "juegos"("id_juego") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "juego_generos" ADD CONSTRAINT "juego_generos_id_genero_fkey" FOREIGN KEY ("id_genero") REFERENCES "generos"("id_genero") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "juego_plataformas" ADD CONSTRAINT "juego_plataformas_id_juego_fkey" FOREIGN KEY ("id_juego") REFERENCES "juegos"("id_juego") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "juego_plataformas" ADD CONSTRAINT "juego_plataformas_id_plataforma_fkey" FOREIGN KEY ("id_plataforma") REFERENCES "plataformas"("id_plataforma") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_id_juego_fkey" FOREIGN KEY ("id_juego") REFERENCES "juegos"("id_juego") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descargas" ADD CONSTRAINT "descargas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descargas" ADD CONSTRAINT "descargas_id_juego_fkey" FOREIGN KEY ("id_juego") REFERENCES "juegos"("id_juego") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proximos_lanzamientos" ADD CONSTRAINT "proximos_lanzamientos_id_juego_fkey" FOREIGN KEY ("id_juego") REFERENCES "juegos"("id_juego") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_id_juego_fkey" FOREIGN KEY ("id_juego") REFERENCES "juegos"("id_juego") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_subido_por_fkey" FOREIGN KEY ("subido_por") REFERENCES "usuarios"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailer_categorias" ADD CONSTRAINT "trailer_categorias_id_trailer_fkey" FOREIGN KEY ("id_trailer") REFERENCES "trailers"("id_trailer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trailer_categorias" ADD CONSTRAINT "trailer_categorias_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias_trailer"("id_categoria") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "noticias" ADD CONSTRAINT "noticias_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "usuarios"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagenes_noticias" ADD CONSTRAINT "imagenes_noticias_id_noticia_fkey" FOREIGN KEY ("id_noticia") REFERENCES "noticias"("id_noticia") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_id_lanzamiento_fkey" FOREIGN KEY ("id_lanzamiento") REFERENCES "proximos_lanzamientos"("id_lanzamiento") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_login" ADD CONSTRAINT "qr_login_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;
