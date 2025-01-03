import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailTemplate } from './entities/mail-template.entity';
import { MailService } from './mail.service';

@Injectable()
export class MailTemplatesService {
  constructor(
    @InjectRepository(MailTemplate)
    private readonly emailTemplateRepository: Repository<MailTemplate>,

    private readonly mailService: MailService,
  ) {}

  async createTemplate(data: Partial<MailTemplate>): Promise<MailTemplate> {
    const template = this.emailTemplateRepository.create(data);
    return await this.emailTemplateRepository.save(template);
  }

  // ========== sentMailTemplate. start ==========
  async sentMailRegister(body: any) {
    // Obtener la plantilla de correo
    const templateMail = await this.getTemplateById(1); // ID de la plantilla
    if (!templateMail) {
      throw new NotFoundException('Plantilla no encontrada');
    }

    // Reemplazar placeholders con los datos dinámicos
    const placeholders = { name: body.firstName };

    const personalizedHtml = this.replacePlaceholders(
      templateMail.htmlContent,
      placeholders,
    );

    // Crear cuerpo del correo
    const emailBody = {
      to: body.email,
      subject: templateMail.subject,
      text: body.text || 'Este es el contenido del correo en texto plano',
      html: personalizedHtml,
    };

    // Enviar correo
    try {
      const result = await this.mailService.sendMail(emailBody); // Asegúrate de descomentar cuando esté listo
      console.info('Email sent successfully:', result);
      return { message: 'Correo enviado exitosamente', result };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Error al enviar el correo');
    }
  }

  // Función para reemplazar los placeholders en la plantilla
  private replacePlaceholders(
    template: string,
    variables: Record<string, string>,
  ): string {
    return template.replace(
      /{{(\w+)}}/g,
      (_, key) => variables[key] || `{{${key}}}`,
    );
  }

  // ========== sentMailTemplate. end ==========

  // ========== createAppointmentTemplate. start ==========

  async createAppointmentTemplate(data: any) {
    // Desestructuramos la información relevante
    const { date, description, patient, professional, status } = data;

    // Convertimos la fecha al formato adecuado en zona horaria de Argentina
    const formattedDate = new Date(date).toLocaleString('es-ES', {
      timeZone: 'America/Argentina/Buenos_Aires',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Obtenemos nombres y apellidos del paciente y profesional
    const patientName = `${patient.firstName} ${patient.lastName}`;
    const professionalTitle = professional.title || '';
    const professionalName = `${professionalTitle} ${professional.firstName} ${professional.lastName}`;

    // Generamos el pronombre del profesional basado en su género
    const pronoun = professional.gender === 'man' ? 'el' : 'la';

    // Obtener la plantilla de correo desde la base de datos
    const templateMailId2 = await this.getTemplateById(2); // ID de la plantilla
    if (!templateMailId2) {
      throw new NotFoundException('Plantilla no encontrada');
    }

    // Reemplazar los placeholders en la plantilla con los datos dinámicos
    const placeholders = {
      name: patientName,
      formattedDate: formattedDate,
      professionalName: `${pronoun} ${professionalName}`,
      description: description,
      status: status === 'PENDING' ? 'Pendiente' : status,
    };

    const personalizedHtml = this.replacePlaceholders(
      templateMailId2.htmlContent,
      placeholders,
    );
    const personalizedText = this.replacePlaceholders(
      templateMailId2.text,
      placeholders,
    );

    // Crear cuerpo del correo
    const emailBody = {
      to: patient.email, // Correo del paciente
      subject: templateMailId2.subject, // Asunto de la plantilla
      text:
        personalizedText || 'Este es el contenido del correo en texto plano', // Contenido en texto plano
      html: personalizedHtml, // Contenido en HTML
    };

    // Enviar correo
    try {
      const result = await this.mailService.sendMail(emailBody); // Asegúrate de que tu mailService esté configurado correctamente
      console.info('Email sent successfully:', result);
      return { message: 'Correo enviado exitosamente', result };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Error al enviar el correo');
    }
  }

  // Función para reemplazar los placeholders en la plantilla
  // private replacePlaceholders(
  //   template: string,
  //   variables: Record<string, string>,
  // ): string {
  //   return template.replace(
  //     /{{(\w+)}}/g,
  //     (_, key) => variables[key] || `{{${key}}}`, // Si no hay variable, mantiene el placeholder
  //   );
  // }

  // // Función para convertir texto a HTML (si es necesario)
  // private convertTextToHtml(text: string): string {
  //   // Aquí puedes usar alguna librería como 'markdown-it' o construir un HTML básico.
  //   // Ejemplo simple:
  //   return `<p>${text.replace(/\n/g, '</p><p>')}</p>`;
  // }

  // ========== createAppointmentTemplate. end ==========

  async getTemplates(): Promise<MailTemplate[]> {
    return await this.emailTemplateRepository.find();
  }

  async getTemplateById(id: number): Promise<MailTemplate> {
    return await this.emailTemplateRepository.findOne({ where: { id } });
  }

  async updateTemplate(
    id: number,
    data: Partial<MailTemplate>,
  ): Promise<MailTemplate> {
    await this.emailTemplateRepository.update(id, data);
    return await this.getTemplateById(id);
  }

  async deleteTemplate(id: number): Promise<void> {
    await this.emailTemplateRepository.delete(id);
  }
}
