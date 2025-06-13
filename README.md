# 📊 CalculadoraSagulpa

¡Bienvenido a **CalculadoraSagulpa**! Este es el repositorio para el sistema de gestión de la base de datos que alimenta la aplicación. A continuación encontrarás toda la información necesaria para entender y trabajar con la base de datos del proyecto.

---

## 💾 Base de Datos

El corazón de este proyecto es la base de datos `calculadoraparkin`, diseñada para ser simple, segura y eficiente.

* **Nombre de la Base de Datos:** `calculadoraparkin`

### 🏗️ Estructura de las Tablas

La base de datos se compone de dos tablas principales: `usuarios` y `fechas`.

#### Tabla `usuarios`

Esta tabla almacena la información de los usuarios con acceso al sistema.

| Columna     | Tipo    | Descripción                                           |
| :---------- | :------ | :---------------------------------------------------- |
| **`id`(PK)**| INT     | Identificador único y autonumérico para cada usuario. |
| `nombre`    | VARCHAR | Nombre de usuario (único).                            |
| `passwd`    | VARCHAR | Contraseña del usuario. **Importante:** se almacena encriptada. |

<br>

#### Tabla `fechas`

Utilizada para registrar fechas relevantes para los cálculos de la aplicación.

| Columna | Tipo | Descripción                                         |
| :------ | :--- | :-------------------------------------------------- |
| `fecha` | DATE | Almacena una fecha específica en formato `AAAA-MM-DD`. |

---

## ⚙️ Procedimientos Almacenados (Procedures)

Para facilitar la gestión de usuarios y garantizar la seguridad, se han creado dos procedimientos almacenados. **Se recomienda encarecidamente utilizar estos procedimientos en lugar de realizar operaciones `INSERT` o `DELETE` directamente**.

### ✅ Agregar un Nuevo Usuario

Utiliza `agregar_usuario` para registrar un nuevo usuario. Este procedimiento se encarga de encriptar la contraseña automáticamente antes de guardarla, asegurando que nunca se almacenen contraseñas en texto plano.

**Uso:**

```sql
CALL agregar_usuario('nombre_de_usuario', 'contraseña_a_utilizar');
```

**Ejemplo:**

```sql
CALL agregar_usuario('juan.perez', 'MiContraseñaSegura123');
```

### 🗑️ Eliminar un Usuario Existente

Si necesitas revocar el acceso a un usuario, utiliza `eliminar_usuario`. Este procedimiento eliminará de forma segura el registro del usuario basándose en su nombre.

**Uso:**

```sql
CALL eliminar_usuario('nombre_de_usuario_a_eliminar');
```

**Ejemplo:**

```sql
CALL eliminar_usuario('juan.perez');
```

---

## 🚀 Puesta en Marcha

Para desplegar esta base de datos en tu entorno local o en un servidor, sigue estos pasos:

1.  **Crea la Base de Datos:**
    ```sql
    CREATE DATABASE calculadoraparkin;
    ```
2.  **Carga el Script SQL:** Importa el archivo `.sql` que contiene la definición de las tablas y los procedimientos almacenados.
3.  **Verifica la Instalación:** Conéctate a la base de datos y ejecuta `SHOW TABLES;` para confirmar que `usuarios` y `fechas` se han creado correctamente.
4.  **¡Listo!** Ya puedes empezar a gestionar usuarios y registrar fechas utilizando los procedimientos facilitados.
