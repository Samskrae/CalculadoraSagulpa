# 📊 CalculadoraSagulpa

Este es el repositorio para el sistema de gestión de la base de datos que alimenta la aplicación. A continuación encontrarás toda la información necesaria para entender y trabajar con la base de datos del proyecto.

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

#### Tabla `diasfestivos`

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

### 🗑️ Eliminar un Usuario Existente

Si necesitas revocar el acceso a un usuario, utiliza `eliminar_usuario`. Este procedimiento eliminará de forma segura el registro del usuario basándose en su nombre.

**Uso:**

```sql
CALL eliminar_usuario('nombre_de_usuario_a_eliminar');
```


---
$username = "calculadora_user";
$password = "P@ssw0rd_S3gur@_2025!";


---

## ⚙️ Modificaciones
El programa se encuentra en una máquina Apache, esto quiere decir que si hace falta modificarlo estará ubicado en /var/www/Calculadora/.

