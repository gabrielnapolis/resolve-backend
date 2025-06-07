import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/guard/passport-auth.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UsePipes(new ValidationPipe())
  @Post('/subscribe')
  subscribe(@Body() dto: CreateSubscriptionDto, @Request() request) {
    dto.userId = request.user.id;
    return this.paymentService.subscribe(dto);
  }

  @Post('/subscription/cancel')
  async cancel(@Request() request) {
    let userId = request.user.id;
    return await this.paymentService.cancelSubscription(userId);
  }

  @Get('/subscription/me')
  async findUserSubscription(@Request() request) {
    let userId = request.user.id;
    return this.paymentService.findUserSubscription(userId);
  }

  @Post('/subscription/pix')
  async monthlySubscription(@Request() request) {
    let dto = {
      userId: request.user.id,
    } as CreateSubscriptionDto;
    return this.paymentService.payWithPix(dto);
  }

  @Get('/subscription/pix/:id/capture')
  async capturePix(@Param('id') id: string) {
    return await this.paymentService.capturePix(id);
  }

  @Post('/pagseguro/pix/webhook')
  Webhook(@Body() dto: any, @Request() request) {
    if (dto && dto.charges) {
      return this.paymentService.processPix(dto);
    }
  }
}
