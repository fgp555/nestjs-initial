import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailTemplatesService } from '../mail-template.service';

@Injectable()
export class MailSeederService implements OnModuleInit {
  constructor(private readonly emailTemplatesService: MailTemplatesService) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed(): Promise<void> {
    console.log('Running mail seeder...');

    const templates = [
      {
        templateName: 'Registro de Usuario',
        subject: '¡Bienvenido a nuestro Centro de Fisioterapia!',
        text: '¡Bienvenido a nuestro Centro de Fisioterapia!',
        htmlContent:
          '<h1>¡Hola {{name}}! Bienvenido a <strong>CREFI</strong></h1><p>Nos alegra mucho que te hayas registrado en nuestro Centro de Fisioterapia. Estamos comprometidos con tu bienestar y salud.</p><p>Si tienes alguna consulta o necesitas ayuda, no dudes en <a href="mailto:crefi@giomr.site" rel="noopener noreferrer" target="_blank">contactarnos</a>. Estamos aquí para apoyarte.</p><p>¡Bienvenido a nuestra familia!</p><p>Atentamente,</p><p>El equipo de tu Centro de Fisioterapia</p>',
      },
      {
        templateName: 'Cita Programada',
        subject: 'Tu turno ha sido programado exitosamente',
        htmlContent:
          '<p>Hola {{name}},</p><p>Tu turno ha sido programado exitosamente en el Centro de Fisioterapia:</p><ul><li>🗓 <strong>Fecha y hora:</strong> {{formattedDate}}</li><li>👩‍⚕️ <strong>Profesional:</strong> {{professionalName}}</li><li>📝 <strong>Motivo:</strong> {{description}}</li><li>📄 <strong>Estado:</strong> {{status}}</li></ul><p>Si tienes preguntas o necesitas reprogramar, por favor contáctanos.</p><p>Gracias por confiar en nosotros.</p><p><strong>Centro de Fisioterapia CREFI</strong></p><p>Correo: crefi@giomr.site</p>',
        text: `Hola {{name}},
      
      Tu turno ha sido programado exitosamente en el Centro de Fisioterapia:
      
      🗓 Fecha y hora: {{formattedDate}}
      👩‍⚕️ Profesional: {{professionalName}}
      📝 Motivo: {{description}}
      📄 Estado: {{status}}
      
      Si tienes preguntas o necesitas reprogramar, por favor contáctanos.
      
      Gracias por confiar en nosotros.
      
      Centro de Fisioterapia [Nombre del Centro]
      Teléfono: [Número de teléfono]
      Correo: [Correo electrónico]`,
      },

      // {
      //   templateName: 'Asignación de Turno',
      //   subject: 'Tu turno ha sido asignado',
      //   htmlContent:
      //     '<p>Asignación de Turno</p><h1>Hola {{name}}!</h1><p>Te informamos que tu turno ha sido asignado para la fecha: {{date}} a las {{time}}.</p>',
      // },
      // {
      //   templateName: 'Confirmación de Turno',
      //   subject: 'Confirma tu turno',
      //   htmlContent:
      //     '<p>Confirmación de Turno</p><h1>Hola {{name}}!</h1><p>Por favor confirma tu asistencia al turno programado para el {{date}} a las {{time}}.</p>',
      // },
      // {
      //   templateName: 'Cancelación de Turno',
      //   subject: 'Tu turno ha sido cancelado',
      //   htmlContent:
      //     '<p>Cancelación de Turno</p><h1>Hola {{name}}!</h1><p>Lamentamos informarte que tu turno programado para el {{date}} a las {{time}} ha sido cancelado. Por favor, contáctanos si necesitas más información.</p>',
      // },
      // {
      //   templateName: 'Notificación de Turno Próximo',
      //   subject: '¡Falta una hora para tu turno!',
      //   htmlContent:
      //     '<p>Turno Próximo</p><h1>Hola {{name}}!</h1><p>Te recordamos que falta una hora para tu turno programado el {{date}} a las {{time}}. Por favor, asegúrate de llegar a tiempo.</p>',
      // },
    ];

    for (const template of templates) {
      await this.emailTemplatesService.createTemplate(template);
    }
  }
}
