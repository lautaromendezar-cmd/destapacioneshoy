# Mudanza del dominio a Vercel

Estado al **26-sep-2026**. El sitio nuevo está publicado y aprobado; el
dominio todavía apunta al WordPress viejo en HostMar. La decisión tomada es
**dejar morir el hosting**: no se renueva el WordPress.

---

## Lo que hay que entender antes de tocar nada

**Los nameservers son del hosting.** La delegación es en cadena:

```
NIC.ar  ──>  ns1/ns2.donweb.com  ──>  ns3/ns4.hostmar.com  ──>  la zona
```

Si se da de baja el hosting, **ns3/ns4.hostmar.com dejan de responder por este
dominio y el dominio deja de resolver por completo**. El sitio en Vercel puede
estar impecable: nadie llega igual, ni por el dominio ni por el `www`.

Por eso, dejando morir el hosting **no alcanza con cambiar el registro A**.
Hay que sacar la zona de HostMar antes, apuntando los nameservers a Vercel.

**El dominio vence el 1-oct-2026** y el titular registrado es
`DATTATEC.COM S.R.L.` (CUIT 30710173652), no el cliente. Dar de baja el
hosting no puede arrastrar al dominio: la renovación del dominio es una cosa
y el hosting es otra, aunque las facture el mismo proveedor.

---

## Orden de los pasos

El orden importa: cada paso depende de que el anterior esté verificado.

1. **Renovar el dominio** y, si se puede, pasar la titularidad al cliente en
   NIC.ar. Vence el 1-oct-2026.
2. **Preguntarle al cliente si usa alguna casilla `@destapacioneshoy.com.ar`.**
   Ver la sección de correo, abajo.
3. **Antes de tocar los nameservers: dar vuelta el redirect en Vercel.** Al
   agregar el dominio, Vercel dejó el apex redirigiendo 308 al `www` y el
   `www` como Production. Es al revés de lo que declara el sitio: `sitio.url`,
   el `canonical`, el sitemap y **la propiedad de Search Console** son todos
   `https://destapacioneshoy.com.ar` **sin www**. Si queda así, todas las
   visitas terminan en el `www`, la propiedad medida queda vacía y el
   historial se pierde en la práctica aunque nadie lo haya borrado.

   En Vercel → Settings → Domains: editar `destapacioneshoy.com.ar` para que
   sea Production (sin redirect), y editar `www.destapacioneshoy.com.ar` para
   que redirija 308 a `destapacioneshoy.com.ar`.

4. **Cambiar los nameservers a Vercel**, en el panel de DonWeb o en NIC.ar
   (no en HostMar: ahí sólo está la zona delegada):

   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

   ✅ **La zona de correo ya está cargada en Vercel** (26-sep-2026), así que
   el correo no se corta en el momento del cambio: sigue yendo al hosting
   hasta que el hosting muera. Son `mail`, `mx1` y `ftp` en A, el AAAA de
   `mail`, los dos MX, el SPF, el DMARC y el DKIM — todo copiado tal cual de
   la zona vieja. Lo único que **no** se copió es el AAAA del apex, que
   mandaría la web al WordPress viejo por IPv6.

5. **Esperar a que propague** y verificar que el dominio resuelve a Vercel y
   que el sitio carga en `https://destapacioneshoy.com.ar/` y en el `www`.
6. **Search Console**: recién ahí apretar VERIFICAR con el método "Etiqueta
   HTML". La etiqueta ya viaja en el sitio nuevo
   (`metadata.verification.google` en `src/app/layout.tsx`) y no se saca nunca.
   Después, enviar el sitemap: `https://destapacioneshoy.com.ar/sitemap.xml`.
7. **Recién con todo lo anterior verificado, dar de baja el hosting.**

No hace falta tocar el código en ningún momento: el `noindex` está puesto por
host en `next.config.ts`, así que el `.com.ar` se indexa solo en cuanto
resuelva y los `.vercel.app` quedan bloqueados para siempre.

---

## El correo

El dominio tiene correo configurado en el mismo servidor que la web
(`l008.dattaweb.com`). **Si muere el hosting, muere el correo.**

Lo que se sabe: **ningún sitio publica una dirección de este dominio.** Ni el
WordPress viejo ni el sitio nuevo — el contacto es el teléfono y WhatsApp
(11 3163-5383). Así que de cara al público no se pierde nada.

Lo que falta saber, y sólo lo puede contestar el cliente: **si usa alguna
casilla para algo suyo** (facturación, ARCA, un proveedor). Si la usa, antes
de cortar hay que recrear el correo en otro lado —Zoho Mail tiene plan
gratis— y cargar los MX nuevos en el DNS de Vercel.

---

## Inventario de la zona DNS actual

Tomado de `ns3.hostmar.com` el 26-sep-2026, antes de tocar nada. **Cuando el
hosting se dé de baja esto no se puede recuperar.** Todo apunta al hosting;
no hay nada externo que haya que preservar.

| Nombre                 | Tipo  | Valor                             |
| ---------------------- | ----- | --------------------------------- |
| `@`                    | A     | `200.58.112.98`                   |
| `@`                    | AAAA  | `2800:6c0:2::1:8`                 |
| `www`                  | CNAME | `destapacioneshoy.com.ar`         |
| `mail`                 | A     | `200.58.112.98`                   |
| `mx1`                  | A     | `200.58.122.206`                  |
| `ftp`                  | A     | `200.58.112.98`                   |
| `mail`                 | AAAA  | `2800:6c0:2::1:8`                 |
| `ftp`                  | AAAA  | `2800:6c0:2::1:8`                 |
| `autodiscover`         | CNAME | `destapacioneshoy.com.ar`         |
| `autoconfig`           | CNAME | `destapacioneshoy.com.ar`         |
| `@`                    | MX    | `0 mail.destapacioneshoy.com.ar`  |
| `@`                    | MX    | `20 mx1.destapacioneshoy.com.ar`  |
| `@`                    | TXT   | `v=spf1 include:comp.hostmar.com -all` |
| `_dmarc`               | TXT   | `v=DMARC1; p=none`                |
| `mail._domainkey`      | TXT   | DKIM, `v=DKIM1; g=*; k=rsa; p=MIIBIjANBgkq…` (clave completa en el DNS de Vercel) |
| `@`                    | NS    | `ns3.hostmar.com`, `ns4.hostmar.com` |

Con los nameservers en Vercel, el apex y el `www` los resuelve Vercel solo.
El resto son registros de cPanel que no hay que recrear, **salvo los MX si el
cliente decide conservar el correo** — y en ese caso apuntando al proveedor
nuevo, no a HostMar, que ya no va a existir.

Para cargar registros en Vercel, una vez que los nameservers estén allá:

```
vercel dns add destapacioneshoy.com.ar <nombre> <tipo> <valor> --scope lautaro-mendez-s-projects
```
