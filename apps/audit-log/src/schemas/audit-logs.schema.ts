import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AuditLogs extends Document {
  @Prop({ type: String })
  userId: string;

  @Prop({ type: String })
  action: string;

  @Prop({ type: String })
  deviceId: string;

  @Prop({ type: Object })
  metadata: Record<string, any>; // 半结构化字段
}

export const AuditLogsSchema = SchemaFactory.createForClass(AuditLogs);
