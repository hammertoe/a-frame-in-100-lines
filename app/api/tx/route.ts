import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, parseEther } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import CatsOrDogsABI from '../../_contracts/CatsOrDogsABI';
import { CATS_OR_DOGS_CONTRACT_ADDR } from '../../config';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const data = encodeFunctionData({
    abi: CatsOrDogsABI,
    functionName: 'voteForCats',
    args: [],
  });

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${arbitrumSepolia.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      data,
      to: CATS_OR_DOGS_CONTRACT_ADDR,
      value: parseEther('0').toString(), 
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
